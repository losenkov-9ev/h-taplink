import React from 'react';
import { Home } from '../pages/Home';
import { ThemeProvider, useTheme } from '@/app/providers/ThemeProvider';

import clsx from 'clsx';
import './styles/global.scss';

import { useTabSettings } from '../shared/lib/hooks/useTabSettings';
import { useFetchPublicData } from '../shared/lib/hooks/useFetchPublicData';
import { usePublicFont } from '../shared/lib/hooks/usePublicFont';

export const PublicApp: React.FC = () => {
  useFetchPublicData();
  useTabSettings();
  usePublicFont();

  const { theme } = useTheme();

  return (
    <div className={clsx('public-page', theme)}>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </div>
  );
};
