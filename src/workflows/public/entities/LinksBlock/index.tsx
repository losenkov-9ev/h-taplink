import React from 'react';
import cls from './LinksBlock.module.scss';

import AngleRightIcon from '@images/angle-right.svg';
import clsx from 'clsx';

export const LinksBlock: React.FC = () => {
  return (
    <div className={cls.linksBlock}>
      <div className={clsx(cls.linksBlock_inner, 'public-container')}>
        <h2 className={clsx(cls.linksBlock_title, 'public-title')}>Ссылки</h2>
        <div className={cls.linksBlock_box}>
          {Array(7)
            .fill('')
            .map(() => (
              <a href="#" className={cls.linksBlock_link}>
                Cсылка
                <AngleRightIcon />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
