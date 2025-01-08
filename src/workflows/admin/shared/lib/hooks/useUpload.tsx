import { useState, useMemo, useRef, useEffect } from 'react';

interface UseUploadProps {
  acceptTypes?: string[];
  onUploadFile?: (file: File) => void;
  onClearFile?: () => void;
  clearTrigger?: number;
}

export const useUpload = ({
  acceptTypes,
  onUploadFile,
  onClearFile,
  clearTrigger,
}: UseUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const accept = useMemo(() => acceptTypes?.join(','), [acceptTypes]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (onUploadFile) onUploadFile(file);

      if (acceptTypes && !acceptTypes.includes(file.type)) {
        setError('Недопустимый тип файла');
        return;
      }

      setFile(file);
    }
  };

  const handleClickClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (onClearFile) onClearFile();
    setTimeout(() => handleClear(), 0);
  };

  const handleClear = () => {
    setFile(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (clearTrigger !== undefined) {
      handleClear();
    }
  }, [clearTrigger]);

  return {
    file,
    error,
    accept,
    inputRef,
    handleFileChange,
    handleClickClear,
    handleClear,
  };
};
