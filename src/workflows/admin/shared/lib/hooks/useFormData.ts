import { DataContext } from '@/app/providers/DataProvider/lib/dataContext';
import { useContext } from 'react';

export const useFormData = () => {
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    throw new Error('XmasMode must be used within DataProvider');
  }

  return dataContext.formData;
};
