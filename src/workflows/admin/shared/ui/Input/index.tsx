import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';

import cls from './Input.module.scss';
import HidePasswordIcon from '@images/hide-password.svg';
import ShowPasswordIcon from '@images/show-password.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  isError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    title,
    type = 'text',
    isError = false,
    className,
    value,
    onChange,
    ...otherProps
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(type !== 'password');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={clsx(cls.input, className)}>
      {title && <div className={clsx(cls.title, 's-1')}>{title}</div>}
      <div className={clsx(cls.input_wrapper, { [cls.input_wrapper_error]: isError })}>
        <input
          ref={ref}
          type={type !== 'password' ? type : isPasswordVisible ? 'text' : 'password'}
          value={value} // Получаем value из props
          onChange={onChange} // Вызываем onChange из props
          {...otherProps}
        />
        {type === 'password' && (
          <button type="button" className={cls.input_button} onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </button>
        )}
      </div>
    </div>
  );
});
