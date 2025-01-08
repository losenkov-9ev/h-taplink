import React from 'react';
import clsx from 'clsx';

import cls from './Input.module.scss';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
}

export const Textarea: React.FC<InputProps> = (props) => {
  const { title, className, ...otherProps } = props;

  return (
    <div className={clsx(cls.input, cls.textarea, className)}>
      {title && <div className={clsx(cls.title, 's-1')}>{title}</div>}
      <textarea {...otherProps}></textarea>
    </div>
  );
};
