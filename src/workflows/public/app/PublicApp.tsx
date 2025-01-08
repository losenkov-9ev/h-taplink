import React from 'react';
import { Home } from '../pages/Home';
import { ThemeProvider, useTheme } from '@/app/providers/ThemeProvider';

import './styles/global.scss';
import clsx from 'clsx';

import BgImage from '@images/themes/bg-1.jpg';
import { useSelector } from 'react-redux';
import { selectTabData } from '@/workflows/admin/features/Tab';

export const PublicApp: React.FC = () => {
  const { theme } = useTheme();
  const tabData = useSelector(selectTabData);

  React.useEffect(() => {
    document.title = tabData.name;
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = '/path-to-your-new-favicon.ico'; // Укажите путь к вашему favicon
    }
  }, [tabData]);

  return (
    <div className={clsx('public-page', theme)} style={{ backgroundImage: `url('${BgImage}')` }}>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </div>
  );
};
