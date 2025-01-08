import React from 'react';
import cls from '../DesignItem.module.scss';
import clsx from 'clsx';
import { Mods } from '@/app/types';

import NoImageIcon from '@images/design-item-noImage.svg';
import CheckedIcon from '@images/design-item-checked.svg';

interface DesignItemProps {
  image?: string | React.ReactElement<HTMLImageElement> | React.ReactElement<SVGAElement>;
  isChecked?: boolean;
  name: string;
  imageHeight?: number;
  onClick?: () => void;
}

export const Default: React.FC<DesignItemProps> = (props) => {
  const { image, name, isChecked, imageHeight, onClick } = props;

  const mods: Mods = { [cls.checked]: Boolean(isChecked) };

  return (
    <div className={clsx(cls.designItem, mods)} onClick={onClick}>
      <div
        className={clsx(cls.designItem_image, { [cls.noImage]: !image })}
        style={imageHeight ? { height: `${imageHeight}px` } : undefined}>
        <div className={clsx(cls.designItem_checkedImage)}>
          <CheckedIcon />
        </div>

        {image && typeof image === 'string' ? (
          <img src={image} alt="" />
        ) : image && React.isValidElement(image) ? (
          image
        ) : (
          <NoImageIcon />
        )}
      </div>
      <div className={cls.designItem_name}>{name}</div>
    </div>
  );
};
