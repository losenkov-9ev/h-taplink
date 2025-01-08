import { useContext } from 'react';
import { SaveContext } from './saveContext';

export const useSaveContext = () => {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
