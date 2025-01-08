import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import LogoIcon from '@images/logo.svg';
import LogoTabletIcon from '@images/logo-tablet.svg';
import LogoMobileIcon from '@images/logo-mobile.svg';
import { useMediaQuery } from 'react-responsive';

import { DEFAULT_WINDOW_WIDTH } from '@/app/global';

export const Logo: React.FC<LinkProps> = (props) => {
  const isLaptop = useMediaQuery({ maxWidth: DEFAULT_WINDOW_WIDTH.laptop });
  const isTablet = useMediaQuery({ maxWidth: DEFAULT_WINDOW_WIDTH.tablet });

  const LogoCondition = () => {
    if (isTablet && isLaptop) return <LogoMobileIcon />;
    if (isLaptop && !isTablet) return <LogoTabletIcon />;
    else return <LogoIcon />;
  };

  return (
    <Link {...props}>
      <LogoCondition />
    </Link>
  );
};
