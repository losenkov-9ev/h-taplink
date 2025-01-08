import React, { useCallback } from 'react';
import { SaveContext } from '../lib/saveContext';

interface SaveProviderProps {
  children: React.ReactNode;
}

export const SaveProvider: React.FC<SaveProviderProps> = ({ children }) => {
  const notifyHandlers = React.useRef<Set<() => void>>(new Set());

  const onButtonClick = useCallback(() => {
    notifyHandlers.current.forEach((handler) => handler()); // Вызываем все обработчики
  }, []);

  const addNotifyHandler = useCallback((handler: () => void) => {
    notifyHandlers.current.add(handler); // Добавляем обработчик в Set (он гарантирует уникальность)
  }, []);

  const removeNotifyHandler = useCallback((handler: () => void) => {
    notifyHandlers.current.delete(handler); // Удаляем обработчик из Set
  }, []);

  return (
    <SaveContext.Provider value={{ onButtonClick, addNotifyHandler, removeNotifyHandler }}>
      {children}
    </SaveContext.Provider>
  );
};
