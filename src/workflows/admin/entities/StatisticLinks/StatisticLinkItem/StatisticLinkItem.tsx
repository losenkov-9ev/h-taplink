import React from 'react';
import cls from './StatisticLinkItem.module.scss';
import clsx from 'clsx';

import CopyIcon from '@images/copy.svg';
import CopiedIcon from '@images/copied.svg';
import { useCopyToClipboard } from '@/workflows/admin/shared/lib';
import { formatNumberWithDelimiter } from '@/workflows/admin/shared/lib/utils/formatNumberWithDelimiter';

interface StatisticLinkItemProps {
  link: string;
  date: string;
  count: number;
}

export const StatisticLinkItem: React.FC<StatisticLinkItemProps> = (props) => {
  const { link, date, count } = props;
  const { isCopied, isButtonDisabled, copyToClipboard } = useCopyToClipboard();

  const handleItemClick = () => {
    console.log('item');
  };

  const handleCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    copyToClipboard(link);
  };

  return (
    <div className={cls.statisticLinkItem} onClick={handleItemClick}>
      <button
        disabled={isButtonDisabled}
        onClick={handleCopyClick}
        type="button"
        className={clsx(cls.statisticLinkItem_link, cls.statisticLinkItem_value)}>
        <span>{link}</span>
        <span>{isCopied ? <CopiedIcon /> : <CopyIcon />}</span>
      </button>
      <div className={clsx(cls.statisticLinkItem_date, cls.statisticLinkItem_value)}>{date}</div>
      <div className={clsx(cls.statisticLinkItem_count, cls.statisticLinkItem_value)}>
        {formatNumberWithDelimiter(count, ' ')}
      </div>
    </div>
  );
};
