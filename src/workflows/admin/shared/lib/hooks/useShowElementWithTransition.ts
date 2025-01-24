import { useState, useRef, useCallback } from 'react';

export const useShowElementWithTransition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showElement, setShowElement] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const onShowElement = useCallback(() => {
    clearTimeoutRef(); // Очищаем возможный таймер закрытия
    setIsVisible(true);
    timeoutRef.current = setTimeout(() => {
      setShowElement(true);
    }, 10); // Плавное включение
  }, []);

  const onCloseElement = useCallback(() => {
    clearTimeoutRef(); // Очищаем возможный таймер открытия
    setShowElement(false);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 200); // Учитываем время анимации
  }, []);

  // Очистка таймеров при размонтировании
  const cleanup = useCallback(() => {
    clearTimeoutRef();
  }, []);

  return {
    isVisible,
    showElement,
    onShowElement,
    onCloseElement,
    cleanup,
  };
};
