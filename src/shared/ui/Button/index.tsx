import clsx from 'clsx';
import React from 'react';

import cls from './Button.module.scss';

export enum ButtonTypes {
  ICON = 'view_icon',
  DEFAULT = 'view_default',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  view?: ButtonTypes;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, view = ButtonTypes.DEFAULT, type = 'button', ...otherProps } = props;

  return (
    <button type={type} className={clsx(cls.button, [className, cls[view]])} {...otherProps}>
      {children}
    </button>
  );
};
