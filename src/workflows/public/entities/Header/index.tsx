import React from 'react';
import cls from './Header.module.scss';
import LogoIcon from '@images/logo.svg';
import { ThemeToggler } from '../../shared/ui/ThemeToggler';
import { useSelector } from 'react-redux';
import { selectLogotypes } from '@/workflows/admin/widgets/Appearance/model/selectors/selectLogos';

export const Header: React.FC = () => {
  const { firstLogo: logo } = useSelector(selectLogotypes);

  return (
    <header className={cls.header}>
      <div className={cls.header_container}>
        {logo ? <img src={logo} alt="header logo" /> : <LogoIcon />}
        <ThemeToggler />
      </div>
    </header>
  );
};
