import React, { useState, useEffect, useCallback, MouseEvent } from 'react';
import cls from './FileUpload.module.scss';
import clsx from 'clsx';

import UploadIcon from '@images/upload.svg';
import ClearIcon from '@images/close.svg';
import FileUploadedIcon from '@images/uploaded-file-icon.svg';
import { useUpload } from '../../lib';

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  tip?: string;
  placeholder?: string;
  acceptTypes?: string[];
  onUploadFile?: (f: File) => void;
  onClearFile?: () => void;
  clearTrigger?: number; // Триггер для очистки: уникальное значение
  preloaded?: {
    url: string;
  };
  isError?: boolean;
  errorText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  title,
  tip,
  placeholder = 'Загрузить файл',
  acceptTypes,
  onUploadFile,
  onClearFile,
  clearTrigger,
  preloaded,
  isError = false,
  ...otherProps
}) => {
  const { file, error, accept, inputRef, handleFileChange, handleClickClear } = useUpload({
    acceptTypes,
    onUploadFile,
    onClearFile,
    clearTrigger,
  });

  const [preloadedFileData, setPreloadedFileData] = useState<{ url: string } | null>(null);

  /**
   * Очистка "предзагруженного" файла.
   */
  const handlePreloadedClear = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      // setTimeout, чтобы дождаться завершения текущего цикла?
      // В большинстве случаев можно обойтись и без него,
      // но оставим исходную логику, если в проекте есть на то причины.
      setTimeout(() => {
        setPreloadedFileData(null);
        handleClickClear(event);
      }, 0);
    },
    [handleClickClear],
  );

  React.useEffect(() => {
    setPreloadedFileData(preloaded || null);
  }, [preloaded]);

  /**
   * При изменении `clearTrigger` обнуляем предзагруженные данные.
   */
  useEffect(() => {
    if (clearTrigger) {
      setPreloadedFileData(null);
    }
  }, [clearTrigger]);

  /**
   * Компонент-функция для рендера файла или предзагруженного файла.
   */
  const FileDisplay = () => {
    // Если есть предзагруженные данные — показываем их
    if (preloadedFileData) {
      const segments = preloadedFileData.url.split('/');
      const filename = segments[segments.length - 1] || 'favicon.ico';

      return (
        <>
          <div
            className={clsx(cls.fileUpload_placeholder, cls.fileUpload_placeholderWithFile, {
              [cls.fileUpload_error]: isError,
            })}>
            <FileUploadedIcon />
            <span>{filename}</span>
          </div>
          <button
            type="button"
            className={cls.fileUpload_clearButton}
            onClick={handlePreloadedClear}>
            <ClearIcon />
          </button>
        </>
      );
    }

    // Иначе, отображаем загруженный пользователем файл (или иконку загрузки)
    return (
      <>
        <div
          className={clsx(cls.fileUpload_placeholder, {
            [cls.fileUpload_placeholderWithFile]: file,
            [cls.fileUpload_error]: isError,
          })}>
          {file ? <FileUploadedIcon /> : <UploadIcon />}
          <span>{file?.name || placeholder}</span>
        </div>
        {file && (
          <button type="button" className={cls.fileUpload_clearButton} onClick={handleClickClear}>
            <ClearIcon />
          </button>
        )}
      </>
    );
  };

  return (
    <div className={cls.fileUpload}>
      {/* Предотвращаем повторное открытие диалога, если файл уже загружен */}
      <label className={cls.fileUpload_label} onClick={(e) => file && e.preventDefault()}>
        <span className={clsx(cls.fileUpload_title, 's-1')}>{title}</span>
        <div className={cls.fileUpload_box}>
          <input
            ref={inputRef}
            type="file"
            disabled={Boolean(file)}
            className={cls.fileUpload_input}
            accept={accept}
            onChange={handleFileChange}
            {...otherProps}
          />
          <FileDisplay />
        </div>
      </label>
      <span className={clsx(cls.fileUpload_tip, { [cls.fileUpload_tip_error]: isError })}>
        {error || tip}
      </span>
    </div>
  );
};
