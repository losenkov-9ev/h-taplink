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

export const Background: React.FC = () => {
  const formData = useFormData();
  const dispatch = useAppDispatch();

  // Данные из Redux
  const backgrounds = useSelector(selectAllBackgrounds);
  const currentBackground = useSelector(selectCurrentBg);
  const backgroundStatus = useSelector(selectBackgroundStatus);
  const backgroundFileFromRedux = useSelector(selectBackgroundFile);

  // Локальное состояние
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [isFileChecked, setIsFileChecked] = useState(false);

  // Храним загруженный файл и URL для превью
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [bgUrl, setBgUrl] = useState<string>('');

  // Триггер очистки для DesignItemFile
  const [clearTrigger, setClearTrigger] = useState<number>(0);

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
   * (если вам это нужно; иначе можно удалить)
   */
  useEffect(() => {
    setBgUrl(backgroundFileFromRedux || '');
  }, [backgroundFileFromRedux]);

  /**
   * Выбор готового (статического) фона
   */
  const handleSelectItem = useCallback((name: string) => {
    setSelectedItem(name);
    setIsFileChecked(false);
  }, []);

  /**
   * Переходим в режим «выбора файла»
   */
  const handleFileSelect = useCallback(() => {
    setIsFileChecked(true);
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
    setIsFileChecked(false);

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
    if (bgFile) {
      formData.set('background_image', bgFile);
    } else {
      // Если бэкенд ожидает именно null, можно JSON-строку или что-то ещё
      formData.set('background_image', '');
    }

    // Если пользователь выбрал статичный фон, можем добавить его ID
    if (selectedItem) {
      formData.set('background', selectedItem);
    }
  }, [formData, bgFile, selectedItem]);

  return (
    <div className={cls.background}>
      <h2 className={clsx(cls.background_title, 's-1')}>Фон страницы</h2>

      <div className={cls.background_inner}>
        {backgroundStatus === LoadingStatus.FULFILLED ? (
          <>
            {backgrounds.map((item) => (
              <DesignItem
                key={item.name_id}
                onClick={() => handleSelectItem(item.name_id)}
                isChecked={selectedItem === item.name_id}
                {...item}
              />
            ))}

            <DesignItemFile
              isChecked={selectedItem === 'file' && isFileChecked}
              onClick={handleFileSelect} // При клике «переключаемся» в режим файла
              onUploadFile={handleBackgroundUpload} // Пользователь выбрал файл
              onClearFile={handleFileDelete} // Пользователь удалил файл
              acceptTypes={[
                'image/x-icon',
                'image/svg+xml',
                'image/jpeg',
                'image/png',
                'image/webp',
              ]}
              clearTrigger={clearTrigger}
              preloaded={{ url: bgUrl }} // Показываем blob-ссылку (или Redux URL)
            />
          </>
        ) : (
          new Array(4).fill(null).map((_, idx) => <DesignItemSkeleton isSmall key={idx} />)
        )}
      </div>
    </div>
  );
};
