import React from 'react';
import { DataContext } from '../lib/dataContext';

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const changeError = (currentError: boolean) => setIsError(currentError);

  const formData = new FormData();

  return (
    <DataContext.Provider value={{ formData, isError, changeError }}>
      {children}
    </DataContext.Provider>
  );
};
