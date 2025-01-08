import { createContext } from 'react';

interface SaveContextProps {
  onButtonClick: () => void;
  addNotifyHandler: (handler: () => void) => void;
  removeNotifyHandler: (handler: () => void) => void;
}

export const SaveContext = createContext<SaveContextProps | undefined>(undefined);
