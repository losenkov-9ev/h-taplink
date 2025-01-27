import React from 'react';
import { Home } from '../pages/Home';
import { ThemeProvider, useTheme } from '@/app/providers/ThemeProvider';

import clsx from 'clsx';
import './styles/global.scss';

import { useTabSettings } from '../shared/lib/hooks/useTabSettings';
import { useFetchPublicData } from '../shared/lib/hooks/useFetchPublicData';
import { usePublicFont } from '../shared/lib/hooks/usePublicFont';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { addSiteVisit } from '@/workflows/admin/pages/Statistics';

export const PublicApp: React.FC = () => {
  const dispatch = useAppDispatch();

  useFetchPublicData();
  useTabSettings();
  usePublicFont();

  const { theme } = useTheme();

  React.useEffect(() => {
    dispatch(addSiteVisit());
  }, [dispatch]);

  return (
    <div className={clsx('public-page', theme)}>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </div>
  );
};
