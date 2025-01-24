import React from 'react';
import cls from './TextBlock.module.scss';
import clsx from 'clsx';

import LogoIcon from '@images/logo-tablet.svg';
import Divider from '@images/strict-text-divider.svg';

import { useSelector } from 'react-redux';
import { selectLogotypes } from '@/workflows/admin/widgets/Appearance/model/selectors/selectLogos';

interface TextBlockProps {
  isFirstBlock?: boolean;
  title: string;
  content: string;
}

export const TextBlock: React.FC<TextBlockProps> = (props) => {
  const { isFirstBlock, title, content } = props;
  const { secondLogo } = useSelector(selectLogotypes);

  return (
    <div className={clsx(cls.textBlock, { [cls.isFirstBlock]: isFirstBlock })}>
      <div className={clsx(cls.textBlock_inner, 'public-container')}>
        <h2 className={clsx(cls.textBlock_title, 'public-title')}>
          {isFirstBlock ? secondLogo ? <img src={secondLogo} alt={title} /> : <LogoIcon /> : title}
        </h2>
        <div className={cls.textBlock_content}>{content}</div>
        {!isFirstBlock && <Divider className={cls.textBlock_divider} />}
      </div>
    </div>
  );
};
