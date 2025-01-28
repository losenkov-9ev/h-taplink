import { createRoutes } from '@/shared/lib/createRoutes';
import { AdminApp } from '@/workflows/admin/app/AdminApp';
import { adminRouteConfig } from '@/workflows/admin/app/config/routes';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './providers/StoreProvider/config/StateSchema';
import { fetchAuthMe } from '@/workflows/admin/entities/AuthForm';
import { PublicApp } from '@/workflows/public/app/PublicApp';
import { PageLoader } from '@/shared/ui/PageLoader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route path="admin" element={<AdminApp />}>
          {createRoutes(adminRouteConfig)}
        </Route>
      </Routes>
    </Suspense>
  );
};
