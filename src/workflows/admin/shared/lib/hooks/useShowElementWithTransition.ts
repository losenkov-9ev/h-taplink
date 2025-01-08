import { useState } from 'react';

export const useShowElementWithTransition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showElement, setShowElement] = useState(false);

  const onShowElement = () => {
    setIsVisible(true);
    setTimeout(() => {
      setShowElement(true);
    }, 10);
  };
  const onCloseElement = () => {
    setShowElement(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  return {
    isVisible,
    showElement,
    onShowElement,
    onCloseElement,
  };
};
