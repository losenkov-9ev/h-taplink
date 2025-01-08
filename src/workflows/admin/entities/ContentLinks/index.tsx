import React from 'react';
import cls from './ContentLinks.module.scss';
import clsx from 'clsx';
import { Button } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { selectLinks } from '../../widgets/Filling';
import type { LinkItem as LinkItemType } from '../../widgets/Filling/index';
import { LinkItem } from './LinkItem';

export const ContentLinks: React.FC = () => {
  const linksData = useSelector(selectLinks);
  const [links, setLinks] = React.useState<LinkItemType[]>(linksData);

  const onCreateNewLink = () => {
    setLinks((prev) => (prev.length < 40 ? [...prev, { name: '', url: '' }] : prev));
  };

  return (
    <div className={cls.contentLinks}>
      <div className={clsx(cls.contentLinks_title, 's-1')}>Ссылки (до 40)</div>
      <div className={cls.contentLinks_box}>
        <div className={cls.contentLinks_inner}>
          {links.map((item, idx) => (
            <LinkItem {...item} key={`${item.url}_${idx}`} />
          ))}
        </div>
        <Button onClick={onCreateNewLink}>Добавить ссылку</Button>
      </div>
    </div>
  );
};
