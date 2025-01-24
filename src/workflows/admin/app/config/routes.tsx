import { RouteProps } from 'react-router';
import React from 'react';

const Auth = React.lazy(() => import('../../pages/Auth'));
const Settings = React.lazy(() => import('../../pages/Settings/index'));
const Statistics = React.lazy(() => import('../../pages/Statistics/ui/index'));

export enum AdminRoutes {
  AUTH = 'auth',
  STATISTICS = 'statistics',
  SETTINGS = 'settings',
}

export const AdminRoutePath: Record<AdminRoutes, string> = {
  [AdminRoutes.AUTH]: 'auth',
  [AdminRoutes.SETTINGS]: 'settings',
  [AdminRoutes.STATISTICS]: 'statistics',
};

export const adminRouteConfig: Record<AdminRoutes, RouteProps> = {
  [AdminRoutes.AUTH]: {
    path: AdminRoutePath.auth,
    element: <Auth />,
    index: true,
  },
  [AdminRoutes.SETTINGS]: {
    path: AdminRoutePath.settings,
    element: <Settings />,
  },
  [AdminRoutes.STATISTICS]: {
    path: AdminRoutePath.statistics,
    element: <Statistics />,
  },
};
