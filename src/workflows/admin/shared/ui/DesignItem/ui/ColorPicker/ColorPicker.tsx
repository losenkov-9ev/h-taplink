import React from 'react';

import cls from './ColorPicker.module.scss';
import clsx from 'clsx';

import EditIcon from '@images/edit.svg';

import { useColor, ColorPicker as ColorPalette, IColor } from 'react-color-palette';
import 'react-color-palette/css';
import { useShowElementWithTransition } from '@/workflows/admin/shared/lib';

interface DesignItemProps {
  name: string;
  startColor: string;
  onClick?: () => void;
  onChangeColor?: (currentColor: IColor) => void;
}

export const ColorPicker: React.FC<DesignItemProps> = (props) => {
  const { name, onClick, startColor, onChangeColor } = props;
  const [color, setColor] = useColor(startColor);

  const { isVisible, showElement, onShowElement, onCloseElement } = useShowElementWithTransition();

  const handleChangeColor = (currentColor: IColor) => {
    setColor(currentColor);
    onChangeColor?.(currentColor);
  };

  return (
    <div
      className={clsx(cls.designItem)}
      onClick={onClick}
      onMouseEnter={onShowElement}
      onMouseLeave={onCloseElement}>
      <div className={clsx(cls.designItem_image)} style={{ background: color.hex }}></div>
      <div className={clsx(cls.designItem_name, cls.designItem_namePicker)}>
        {name} <EditIcon />
      </div>
      {isVisible && (
        <div className={clsx(cls.designItem_picker, { [cls.hovered]: showElement })}>
          <ColorPalette
            hideInput={['rgb', 'hsv']}
            height={180}
            hideAlpha
            color={color}
            onChange={handleChangeColor}
          />
        </div>
      )}
    </div>
  );
};
