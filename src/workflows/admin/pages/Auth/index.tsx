import React from 'react';
import { AuthForm, selectIsAuth } from '../../entities/AuthForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { createLinkPath } from '../../shared/lib/utils/createLinkPath';
import { AdminRoutePath } from '../../app/config/routes';
import { selectAuthStatus } from '../../entities/AuthForm/model/selectors/status';
import { LoadingStatus } from '../../shared/lib/types/loading';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { fetchAuthMe } from '../../entities/AuthForm/model/slice/thunk';

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
