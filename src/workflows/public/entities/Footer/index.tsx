import React from 'react';
import cls from './Footer.module.scss';
import { Button } from '@/shared/ui/Button';

import AngleTopIcon from '@images/angle-top.svg';

export const Footer: React.FC = () => {
  return (
    <div className={cls.footer}>
      <div className={cls.footer_container}>
        <Button className={cls.footer_button}>
          Наверх
          <AngleTopIcon />
        </Button>
      </div>
    </div>
  );
};
