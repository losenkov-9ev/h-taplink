import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import cls from './Tab.module.scss';
import { TabItem } from './TabItem/TabItem';

import { FileUpload } from '@/workflows/admin/shared/ui/FileUpload';
import { Input } from '@/workflows/admin/shared/ui/Input';
import { InputSkeleton } from '@/workflows/admin/shared/ui/Input/InputSkeleton';

import { useToast, ToastType } from '@/workflows/admin/shared/lib/hooks/useToast';
import { useSaveContext } from '@/app/providers/SaveContentProvider';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';

import { selectTabData } from '../model/selectors/tabData';
import { selectTabStatus } from '../model/selectors/tabStatus';
import { updateTab } from '../model/slice/thunk';

import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export const Tab: React.FC = () => {
  const dispatch = useAppDispatch();

  // Селекторы из Redux
  const tabData = useSelector(selectTabData);
  const tabDataStatus = useSelector(selectTabStatus);

  // Хуки для toast-уведомлений и контекста сохранения
  const { notify } = useToast();
  const { addNotifyHandler, removeNotifyHandler } = useSaveContext();

  // Локальное состояние формы
  const [tabName, setTabName] = useState<string>(tabData.name);
  const [faviconUrl, setFaviconUrl] = useState<string>(tabData.favicon);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // Триггер для очистки FileUpload
  // (каждый раз при увеличении числа заставляет FileUpload сбросить состояние)
  const [clearTrigger, setClearTrigger] = useState<number>(0);

  /**
   * Обработка загрузки файла и установка превью (faviconUrl).
   */
  const handleFaviconUpload = useCallback((file: File) => {
    const filePreviewUrl = URL.createObjectURL(file);
    setFaviconUrl(filePreviewUrl);
    setFaviconFile(file);
  }, []);

  /**
   * Очистка загруженного файла.
   */
  const handleFaviconClear = useCallback(() => {
    setFaviconUrl('');
    setFaviconFile(null);
    setClearTrigger((prev) => prev + 1);
  }, []);

  /**
   * Очистка всех данных вкладки (названия и иконки).
   */
  const handleClearTab = useCallback(() => {
    setTabName('');
    setFaviconUrl('');
    setFaviconFile(null);
    setClearTrigger((prev) => prev + 1);
  }, []);

  /**
   * Синхронизация локального состояния при изменении tabData в Redux.
   */
  useEffect(() => {
    setTabName(tabData.name || '');
    setFaviconUrl(tabData.favicon);
    setFaviconFile(null);
    setClearTrigger(0);
  }, [tabData]);

  /**
   * Обработка изменения названия вкладки.
   */
  const handleTabNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTabName(e.target.value);
  }, []);

  /**
   * Колбэк, который будет вызван провайдером сохранения (SaveContentProvider),
   * когда пользователь инициирует сохранение (например, нажимает "Сохранить").
   */
  const handleSave = useCallback(() => {
    // Проверяем, что поля заполнены
    if (!faviconUrl || !tabName) {
      notify('Настройки вкладки не заполнены', ToastType.Error);
      return;
    }

    const formData = new FormData();

    // Прикрепляем файл, если он был загружен
    if (faviconFile) {
      formData.append('favicon', faviconFile);
    }

    formData.append('name', tabName);

    dispatch(updateTab(formData));
  }, [dispatch, faviconUrl, tabName, faviconFile, notify]);

  /**
   * При монтировании компонента регистрируем колбэк сохранения в контексте,
   * при размонтировании — убираем.
   */
  useEffect(() => {
    addNotifyHandler(handleSave);
    return () => {
      removeNotifyHandler(handleSave);
    };
  }, [addNotifyHandler, removeNotifyHandler, handleSave]);

  return (
    <div className={cls.tab}>
      <div className={cls.tab_head}>
        <h1 className={clsx(cls.tab_title, 'h-1')}>Настройки вкладки</h1>
        <TabItem iconUrl={faviconUrl} name={tabName} clear={handleClearTab} />
      </div>

      <div className={cls.tab_box}>
        {tabDataStatus === LoadingStatus.FULFILLED ? (
          <>
            <FileUpload
              title="Favicon"
              placeholder="Загрузить файл"
              tip="Файл 16×16 px в формате .ico, .svg"
              onUploadFile={handleFaviconUpload}
              onClearFile={handleFaviconClear}
              clearTrigger={clearTrigger}
              acceptTypes={['image/x-icon', 'image/svg+xml']}
              preloaded={{ url: faviconUrl }}
            />
            <Input
              title="Название"
              value={tabName}
              onChange={handleTabNameChange}
              placeholder="Ваше название"
            />
          </>
        ) : (
          <>
            <InputSkeleton />
            <InputSkeleton />
          </>
        )}
      </div>
    </div>
  );
};
