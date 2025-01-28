import React from 'react';
import cls from './Header.module.scss';

import ExitIcon from '@images/exit.svg';
import { Logo } from '../../shared/ui/Logo';

import { PageLink } from '@/shared/ui/PageLink';
import { Button, ButtonTypes } from '@/shared/ui/Button';
import { AdminRoutePath } from '../../app/config/routes';
import { createLinkPath } from '../../shared/lib/utils/createLinkPath';

import { DEFAULT_WINDOW_WIDTH } from '@/app/global';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { fetchLogout } from '../AuthForm';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery({ maxWidth: DEFAULT_WINDOW_WIDTH.mobile });

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  const HeaderMenu = () => (
    <div className={clsx(cls.header_menu, cls.header_item)}>
      <PageLink to={createLinkPath(AdminRoutePath.settings)}>Настройки</PageLink>
      <PageLink to={createLinkPath(AdminRoutePath.statistics)}>Статистика</PageLink>
    </div>
  );

  return (
    <div className={cls.header}>
      <div className={cls.header_container}>
        <Logo to={createLinkPath('')} className={clsx(cls.header_item, cls.header_logo)} />
        {!isMobile && <HeaderMenu />}
        <div className={cls.header_item}>
          <Button onClick={handleLogout} view={ButtonTypes.ICON}>
            <ExitIcon />
          </Button>
        </div>
      </div>
      {isMobile && (
        <div className={cls.header_menu_mobile}>
          <HeaderMenu />
        </div>
      )}
    </div>
  );
};
