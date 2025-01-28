import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { AdminRoutePath } from '../../app/config/routes';
import { LoadingStatus } from '../../shared/lib/types/loading';
import { createLinkPath } from '../../shared/lib/utils/createLinkPath';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { AuthForm, selectIsAuth, selectAuthStatus, fetchAuthMe } from '../../entities/AuthForm';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);
  const status = useSelector(selectAuthStatus);

  React.useEffect(() => {
    if (status === LoadingStatus.FULFILLED) dispatch(fetchAuthMe);
  }, [status, dispatch]);

  React.useEffect(() => {
    document.body.classList.add('auth');
    return () => {
      document.body.classList.remove('auth');
    };
  }, []);

  return !isAuth ? <AuthForm /> : <Navigate to={createLinkPath(AdminRoutePath.settings)} />;
};

export default Auth;
