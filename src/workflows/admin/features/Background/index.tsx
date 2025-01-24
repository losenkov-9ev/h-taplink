// src/components/Background.tsx

import React, { useState, useEffect, useCallback } from 'react';
import cls from './Background.module.scss';
import clsx from 'clsx';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';

import {
  selectAllBackgrounds,
  selectBackgroundFile,
  selectBackgroundStatus,
  selectCurrentBg,
} from '../../widgets/Appearance/model/selectors/selectBackground';
import { getBackgrounds } from '../../widgets/Appearance/model/slice/thunks';
import { LoadingStatus } from '../../shared/lib/types/loading';

import { DesignItem, DesignItemFile, DesignItemSkeleton } from '../../shared/ui/DesignItem';
import { useFormData } from '../../shared/lib';
import { selectIsConfigurationsLoading } from '../../widgets/Appearance/model/selectors/selectIsLoading';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { swiperConfig } from './config';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ArrowRight from '@images/arrow-right.svg';
import ArrowLeft from '@images/arrow-left.svg';

export const Background: React.FC = () => {
  const formData = useFormData();
  const dispatch = useAppDispatch();

  // Данные из Redux
  const backgrounds = useSelector(selectAllBackgrounds);
  const currentBackground = useSelector(selectCurrentBg);
  const backgroundStatus = useSelector(selectBackgroundStatus);
  const configurationsStatus = useSelector(selectIsConfigurationsLoading);
  const backgroundFileFromRedux = useSelector(selectBackgroundFile);

  // Локальное состояние
  const [selectedItem, setSelectedItem] = useState<string>('');

  // Храним загруженный файл и URL для превью
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [bgUrl, setBgUrl] = useState<string>('');

  // Триггер очистки для DesignItemFile
  const [clearTrigger, setClearTrigger] = useState<number>(0);

  // Состояние для определения мобильного вида
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 540);
  const sliderRef = React.useRef<SwiperRef>(null);

  /**
   * Обработчик изменения размера окна
   */
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 540);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Устанавливаем начальное состояние при монтировании
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  /**
   * Подгружаем список бэкграундов при первом рендере
   */
  useEffect(() => {
    dispatch(getBackgrounds());
  }, [dispatch]);

  /**
   * Синхронизация с currentBackground (если выбрали фон в другом месте)
   */
  useEffect(() => {
    setSelectedItem(currentBackground);
  }, [currentBackground]);

  /**
   * Если в Redux есть URL предзагруженного фона, подставляем в bgUrl
   */
  useEffect(() => {
    setBgUrl(backgroundFileFromRedux || '');
  }, [backgroundFileFromRedux]);

  /**
   * Выбор готового (статического) фона
   */
  const handleSelectItem = useCallback((name: string) => {
    setSelectedItem(name);
  }, []);

  /**
   * Переходим в режим «выбора файла»
   */
  const handleFileSelect = useCallback(() => {
    setSelectedItem('file');
  }, []);

  /**
   * Когда пользователь загружает файл, формируем blob-ссылку
   */
  const handleBackgroundUpload = useCallback((file: File) => {
    const filePreviewUrl = URL.createObjectURL(file);
    setBgFile(file);
    setBgUrl(filePreviewUrl);
  }, []);

  /**
   * Удаление файла (делаем файл необязательным)
   */
  const handleFileDelete = useCallback(() => {
    // Вернёмся к самому первому фону в списке (или пустому, если список пуст)
    if (backgrounds.length > 0) {
      setSelectedItem(backgrounds[0].name_id);
    } else {
      setSelectedItem('');
    }

    // Сбрасываем локальное состояние
    setBgFile(null);
    setBgUrl('');

    // Увеличиваем счётчик, чтобы дочерний DesignItemFile сбросил своё состояние
    setClearTrigger((prev) => prev + 1);
  }, [backgrounds]);

  useEffect(() => {
    // Если есть пользовательский файл — прикрепляем
    // Если нет файла, прикрепляем null (или вообще не прикрепляем поле, зависит от бэкенда)
    if (bgFile) formData.set('background_image', bgFile);
    else if (bgUrl && !bgFile) formData.set('background_image', backgroundFileFromRedux);
    else formData.set('background_image', '');

    // Если пользователь выбрал статичный фон, можем добавить его ID
    if (selectedItem) {
      formData.set('background', selectedItem);
    }
  }, [formData, bgFile, selectedItem, bgUrl, backgroundFileFromRedux]);

  /**
   * Рендеринг элементов фона
   * В зависимости от состояния загрузки рендерим либо реальные элементы, либо скелетоны
   */
  const renderBackgroundItems = () => {
    if (
      backgroundStatus === LoadingStatus.FULFILLED &&
      configurationsStatus === LoadingStatus.FULFILLED
    ) {
      return backgrounds
        .filter((item) => item.name_id !== 'file')
        .map((item) => (
          <DesignItem
            key={item.name_id}
            onClick={() => handleSelectItem(item.name_id)}
            isChecked={selectedItem === item.name_id}
            image={item.image.preview}
            name={item.name}
          />
        ))
        .concat(
          <DesignItemFile
            key="file"
            isChecked={selectedItem === 'file' && Boolean(bgUrl)}
            onClick={handleFileSelect} // При клике «переключаемся» в режим файла
            onUploadFile={handleBackgroundUpload} // Пользователь выбрал файл
            onClearFile={handleFileDelete} // Пользователь удалил файл
            acceptTypes={['image/x-icon', 'image/svg+xml', 'image/jpeg', 'image/png', 'image/webp']}
            clearTrigger={clearTrigger}
            preloaded={bgUrl ? { url: bgUrl } : null} // Показываем blob-ссылку (или Redux URL)
          />,
        );
    } else {
      // Рендерим скелетоны при загрузке
      return Array.from({ length: 8 }, (_, idx) => <DesignItemSkeleton isSmall key={idx} />);
    }
  };

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className={cls.background}>
      {isMobile ? (
        <>
          <div className={cls.background_head}>
            <h2 className={clsx(cls.background_title, 's-1')}>Фон страницы</h2>
            <div className="default_slider_navigation">
              <span className="default_slider_navigation_prev" onClick={handlePrev}>
                <ArrowLeft />
              </span>
              <span className="default_slider_navigation_next" onClick={handleNext}>
                <ArrowRight />
              </span>
            </div>
          </div>
          <Swiper ref={sliderRef} {...swiperConfig} className={cls.background_inner}>
            {renderBackgroundItems().map((child, index) => (
              <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          <h2 className={clsx(cls.background_title, 's-1')}>Фон страницы</h2>
          <div className={cls.background_inner}>{renderBackgroundItems()}</div>
        </>
      )}
    </div>
  );
};
