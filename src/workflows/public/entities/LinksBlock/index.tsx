import React from 'react';
import cls from './LinksBlock.module.scss';

import AngleRightIcon from '@images/angle-right.svg';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectActiveLinks } from '@/workflows/admin/entities/ContentLinks/model/selectors/selectData';

export const LinksBlock: React.FC = () => {
  const links = useSelector(selectActiveLinks);

  return (
    <div className={cls.linksBlock}>
      <div className={clsx(cls.linksBlock_inner, 'public-container')}>
        <h2 className={clsx(cls.linksBlock_title, 'public-title')}>Ссылки</h2>
        <div className={cls.linksBlock_box}>
          {links.map(({ name, url }, idx) => (
            <a href={url} key={idx} className={cls.linksBlock_link}>
              {name}
              <AngleRightIcon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
