import React from 'react';
import cls from './Header.module.scss';
import LogoIcon from '@images/logo.svg';
import { ThemeToggler } from '../../shared/ThemeToggler';

export const Header: React.FC = () => {
  return (
    <header className={cls.header}>
      <div className={cls.header_container}>
        <LogoIcon />
        <ThemeToggler />
      </div>
    </header>
  );
};
