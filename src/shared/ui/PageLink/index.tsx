import clsx from 'clsx';
import React from 'react';

import cls from './Link.module.scss';

import { NavLink, NavLinkProps } from 'react-router-dom';

export enum PageLinkModes {
  DEFAULT = 'mode_default',
  HOVER = 'mode_hover',
  ACTIVE = 'mode_active',
}

interface PageLinkProps extends NavLinkProps {
  mode?: PageLinkModes;
}

export const PageLink: React.FC<PageLinkProps> = (props) => {
  const { className, children, mode = PageLinkModes.DEFAULT, ...otherProps } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        clsx(cls.link, className, cls[mode], { [cls[PageLinkModes.ACTIVE]]: isActive })
      }
      {...otherProps}>
      {children}
    </NavLink>
  );
};
