import { createContext } from 'react';

interface DataContextProps {
  formData: FormData;
  isError: boolean;
  changeError: (currentError: boolean) => void;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);
