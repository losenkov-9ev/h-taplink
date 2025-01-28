import React from 'react';
import './styles/global.scss';

import { Outlet } from 'react-router-dom';
import { getTab } from '../features/Tab';
import { getAppearance } from '../widgets/Appearance';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../entities/AuthForm';
import { SaveProvider } from '@/app/providers/SaveContentProvider';
import { DataProvider } from '@/app/providers/DataProvider';
import { selectAuthStatus } from '../entities/AuthForm';
import { LoadingStatus } from '../shared/lib/types/loading';

export const AdminApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const authStatus = useSelector(selectAuthStatus);

  React.useEffect(() => {
    if (isAuth && authStatus === LoadingStatus.FULFILLED) {
      dispatch(getAppearance());
      dispatch(getTab());
    }

    document.title = 'Панель Администратора';
  }, [isAuth, authStatus, dispatch]);

  return (
    <SaveProvider>
      <DataProvider>
        <Outlet />
      </DataProvider>
    </SaveProvider>
  );
};
