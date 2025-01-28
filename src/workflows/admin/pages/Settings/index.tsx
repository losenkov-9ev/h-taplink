import React from 'react';
import { Header } from '../../entities/Header';
import { Tab } from '../../features/Tab';
import { Footer } from '../../entities/Footer';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectAuthStatus } from '../../entities/AuthForm';
import { Navigate } from 'react-router';
import { createLinkPath } from '../../shared/lib/utils/createLinkPath';
import { AdminRoutePath } from '../../app/config/routes';
import { Appearance } from '../../widgets/Appearance';
import { Filling } from '../../widgets/Filling';
import { LoadingStatus } from '../../shared/lib/types/loading';
import { PageLoader } from '@/shared/ui/PageLoader';

const Settings: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthLoading = useSelector(selectAuthStatus);

  if (isAuthLoading === LoadingStatus.LOADING) {
    return <PageLoader />;
  }

  if (!isAuth) {
    return <Navigate to={createLinkPath(AdminRoutePath.auth)} />;
  }

  return (
    <div>
      <Header />
      <div className="admin-content">
        <Tab />
        <Appearance />
        <div className="admin-block">
          <h2 className="admin-block_title h-1">Наполнение</h2>
          <Filling />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
