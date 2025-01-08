import React from 'react';
import cls from './Footer.module.scss';
import FooterLogo from '@images/footer-logo.svg';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={cls.footer}>
      <div className={cls.footer_box}>
        <div className={cls.footer_logo}>
          <FooterLogo />
        </div>
        <div className={cls.footer_copy}>© {currentYear} Hermes. All rights reserved</div>
      </div>
    </div>
  );
};
