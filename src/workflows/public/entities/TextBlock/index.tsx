import React from 'react';
import cls from './TextBlock.module.scss';
import clsx from 'clsx';

import LogoIcon from '@images/logo-tablet.svg';

interface TextBlockProps {
  isFirstBlock?: boolean;
  title: string;
  content: string;
}

export const TextBlock: React.FC<TextBlockProps> = (props) => {
  const { isFirstBlock, title, content } = props;

  return (
    <div className={clsx(cls.textBlock, { [cls.isFirstBlock]: isFirstBlock })}>
      <div className="public-container">
        <h2 className={clsx(cls.textBlock_title, 'public-title')}>
          {isFirstBlock ? <LogoIcon /> : title}
        </h2>
        <div className={cls.textBlock_content}>{content}</div>
      </div>
    </div>
  );
};
