import { Button, ButtonTypes } from '@/shared/ui/Button';
import { useTheme } from '@/app/providers/ThemeProvider';
import { ETheme } from '@/app/providers/ThemeProvider';
import React from 'react';

import MoonIcon from '@images/moon.svg';
import SunIcon from '@images/sun.svg';

export const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button view={ButtonTypes.ICON} onClick={toggleTheme}>
      {theme === ETheme.LIGHT ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
