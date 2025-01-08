import React from 'react';
import cls from './TabItem.module.scss';
import clsx from 'clsx';

import FaviconPlaceholderIcon from '@images/faviconPlaceholder.svg';
import ClearIcon from '@images/close.svg';

interface TabItemProps {
  name?: string;
  iconUrl?: string;
  clear: () => void;
}

export const TabItem: React.FC<TabItemProps> = (props) => {
  const { name, iconUrl, clear } = props;

  return (
    <div className={cls.tabItem}>
      <div className={cls.tabItem_box}>
        <div className={cls.tabItem_favicon}>
          {iconUrl ? <img src={iconUrl} alt="" /> : <FaviconPlaceholderIcon />}
        </div>
        <div className={cls.tabItem_name}>{name || 'Название вкладки'}</div>
      </div>
      <div onClick={clear} className={clsx(cls.tabItem_clear, 'icon')}>
        <ClearIcon />
      </div>
    </div>
  );
};
