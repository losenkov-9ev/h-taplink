import React, { useState, useEffect, useCallback, MouseEvent } from 'react';

import cls from '../DesignItem.module.scss';
import clsx from 'clsx';

import FileUploadedIcon from '@images/uploaded-file-icon.svg';
import NoImageIcon from '@images/design-item-noImage.svg';
import CheckedIcon from '@images/design-item-checked.svg';
import UploadIcon from '@images/upload.svg';
import ClearIcon from '@images/close.svg';

import { Mods } from '@/app/types';
import { useUpload } from '@/workflows/admin/shared/lib';

interface DesignItemProps {
  isChecked: boolean;
  imageHeight?: number;
  clearTrigger: number;
  acceptTypes: string[];

  /**
   * Предзагруженные данные (например, если файл уже был загружен ранее).
   * Если переданы — отображаются вместо "заглушки".
   */
  preloaded?: {
    url: string;
  } | null;

  onClick?: () => void;
  onClearFile: () => void;
  onUploadFile: (f: File) => void;
}

export const File: React.FC<DesignItemProps> = (props) => {
  const {
    isChecked,
    imageHeight,
    acceptTypes,
    onUploadFile,
    onClearFile,
    clearTrigger,
    preloaded = null,
    onClick,
  } = props;

  const { file, error, accept, inputRef, handleFileChange, handleClickClear } = useUpload({
    acceptTypes,
    onUploadFile,
    onClearFile,
    clearTrigger,
  });

  const [isCheckedWithFile, setIsCheckedWithFile] = useState<boolean>(false);

  /**
   * Состояние для "предзагруженного" файла (например, если он уже есть на бэкенде).
   */
  const [preloadedFileData, setPreloadedFileData] = useState<{ url: string } | null>(null);

  /**
   * Если в пропах пришли данные о предзагруженном файле — кладём их в состояние.
   */
  useEffect(() => {
    setPreloadedFileData(preloaded || null);
  }, [preloaded]);

  /**
   * По clearTrigger сбрасываем и предзагруженные данные.
   */
  useEffect(() => {
    if (clearTrigger) {
      setPreloadedFileData(null);
    }
  }, [clearTrigger]);

  /**
   * Очистка "предзагруженного" файла.
   * Вызывает штатную handleClickClear для синхронизации с родительской логикой,
   * но дополнительно сбрасывает `preloadedFileData`.
   */
  const handlePreloadedClear = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      // setTimeout, чтобы избежать конфликтов, если очистка нужна строго после каких-то операций
      setTimeout(() => {
        setPreloadedFileData(null);
        handleClickClear(event);
      }, 0);
    },
    [handleClickClear],
  );

  /**
   * Вычисляем итоговый урл картинки:
   * 1. Если есть предзагруженные данные — показываем их.
   * 2. Иначе, если пользователь загрузил файл — используем file.
   */
  const imageUrl = React.useMemo(() => {
    if (preloadedFileData) return preloadedFileData.url;
    if (file) return URL.createObjectURL(file);
    return '';
  }, [preloadedFileData, file]);

  /**
   * При изменении file или isChecked отмечаем, "чекнут" ли у нас файл.
   */
  useEffect(() => {
    setIsCheckedWithFile(isChecked && (Boolean(file) || Boolean(preloadedFileData)));
  }, [file, preloadedFileData, isChecked]);

  /**
   * Вспомогательный объект модификаторов.
   */
  const mods: Mods = {
    [cls.checked]: Boolean(isCheckedWithFile),
  };

  /**
   * Отображаемое имя файла:
   * Если есть предзагруженный файл — берём имя из url (последний сегмент).
   * Иначе — имя у объекта file, либо "Загрузить файл".
   */
  const fileName = React.useMemo(() => {
    if (file) {
      return file.name || 'Загрузить файл';
    }

    if (preloadedFileData) {
      const segments = preloadedFileData.url.split('/');
      return segments[segments.length - 1] || 'file.jpg';
    }

    return 'Загрузить файл';
  }, [preloadedFileData, file]);

  /**
   * Определяем, нужно ли показывать кнопку очистки:
   * если файл предзагружен или пользователь что-то загрузил.
   */
  const showClearButton = Boolean(file) || Boolean(preloadedFileData);

  return (
    <label
      /**
       * Если есть файл (или предзагруженный), то кликабельность
       * хотим оставить (например, для "открыть во всплывающем окне"?).
       * Если файлов нет — кликать не на что.
       */
      onClick={file || preloadedFileData ? onClick : undefined}
      className={clsx(cls.designItem, mods, {
        [cls.designItem_error]: error,
      })}>
      {/* Блок с картинкой */}
      <div
        className={clsx(cls.designItem_image, {
          [cls.noImage]: !imageUrl,
        })}
        style={imageHeight ? { height: `${imageHeight}px` } : undefined}>
        {isCheckedWithFile && (
          <div className={cls.designItem_checkedImage}>
            <CheckedIcon />
          </div>
        )}

        {imageUrl ? <img src={imageUrl} alt="" /> : <NoImageIcon />}
      </div>

      {/* Блок с названием файла и иконками */}
      <div
        className={clsx(cls.designItem_name, cls.designItem_nameFile, {
          [cls.designItem_nameFileActive]: file || preloadedFileData,
        })}>
        {/* Инпут для загрузки файлов (отключаем, если уже что-то есть) */}
        <input
          ref={inputRef}
          type="file"
          disabled={Boolean(file) || Boolean(preloadedFileData)}
          className={cls.designItem_input}
          accept={accept}
          onChange={handleFileChange}
        />

        {/* Отображение названия файла и иконки */}
        <div className={cls.designItem_nameFile_box}>
          {file || preloadedFileData ? <FileUploadedIcon /> : <UploadIcon />}
          <span>{fileName}</span>
        </div>

        {/* Кнопка очистки (если файл уже есть) */}
        {showClearButton && (
          <button
            type="button"
            className={cls.designItem_nameFile_clear}
            /**
             * Если у нас предзагруженный файл — чистим через handlePreloadedClear,
             * иначе чистим обычным способом (handleClickClear).
             */
            onClick={preloadedFileData ? handlePreloadedClear : handleClickClear}>
            <ClearIcon />
          </button>
        )}
      </div>
    </label>
  );
};
