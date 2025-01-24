import React from 'react';
import { Header } from '../../../entities/Header';
import { Footer } from '../../../entities/Footer';
import { Chart } from '../../../features/Chart';
import { StatisticLinks } from '../../../entities/StatisticLinks';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../entities/AuthForm';
import { Navigate } from 'react-router';
import { createLinkPath } from '../../../shared/lib/utils/createLinkPath';
import { AdminRoutePath } from '../../../app/config/routes';
import { getLinks } from '@/workflows/admin/entities/ContentLinks';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';

const Statistics: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  return isAuth ? (
    <div>
      <Header />
      <div className="admin-content">
        <Chart />
        <StatisticLinks />
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to={createLinkPath(AdminRoutePath.auth)} />
  );
};

export default Statistics;
