import React from 'react';
import { Header } from '../../entities/Header';
import { Footer } from '../../entities/Footer';
import { Chart } from '../../features/Chart';
import { StatisticLinks } from '../../entities/StatisticLinks';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../entities/AuthForm';
import { Navigate } from 'react-router';
import { createLinkPath } from '../../shared/lib/utils/createLinkPath';
import { AdminRoutePath } from '../../app/config/routes';

const Statistics: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  return isAuth ? (
    <div>
      <Header />
      <div className="admin-content">
        <Chart
          labels={['2016', '2017', '2018', '2019', '2020', '2021', '2022']}
          dataPoints={[1800, 2400, 1800, 3950, 4500, 4000, 5500]}
        />
        <StatisticLinks />
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to={createLinkPath(AdminRoutePath.auth)} />
  );
};

export default Statistics;
