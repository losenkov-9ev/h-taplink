import { useCallback } from 'react';
import { Id, Slide, toast, ToastContent, ToastOptions } from 'react-toastify';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

const options: ToastOptions = {
  position: 'top-right',
  style: {
    fontWeight: 300,
    fontFamily: 'inherit',
  },
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Slide,
};

export const useToast = () => {
  const notify = useCallback((message: ToastContent, type: ToastType) => {
    toast[type](message, options);
  }, []);

  const loading = useCallback((message: ToastContent): Id => {
    const loadingToastId = toast.loading(message, {
      position: 'top-right',
      hideProgressBar: false,
      theme: 'light',
      transition: Slide,
    });
    return loadingToastId; // Возвращаем ID уведомления для обновления
  }, []);

  const updateLoading = useCallback((id: Id, message: ToastContent, type: ToastType) => {
    toast.update(id, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });
  }, []);

  return { notify, loading, updateLoading };
};
