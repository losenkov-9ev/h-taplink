import React from 'react';
import cls from './StatisticLinkItem.module.scss';
import clsx from 'clsx';

import CopyIcon from '@images/copy.svg';
import CopiedIcon from '@images/copied.svg';

import { useCopyToClipboard } from '@/workflows/admin/shared/lib';
import { formatNumberWithDelimiter } from '@/workflows/admin/shared/lib/utils/formatNumberWithDelimiter';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';

import { useSelector } from 'react-redux';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import { StatisticLinkSkeleton } from './StatisticLinkSkeleton';
import { selectLinkStatsCount, StatsPeriod } from '@/workflows/admin/pages/Statistics';

import TimerIcon from '@images/timer.svg';
import { Button } from '@/shared/ui/Button';
import { getDaysUntilInactive } from '@/workflows/admin/shared/lib/utils/dateInterval';
import { restoreLink } from '../../ContentLinks';
import { getLinkStatsCount } from '@/workflows/admin/pages/Statistics';
import { selectLinkStatsCountStatus } from '@/workflows/admin/pages/Statistics';

interface StatisticLinkItemProps {
  id: number;
  link: string;
  date: string;
  period: StatsPeriod;
  deleted?: boolean;
  deletedAt: Date;
}

export const StatisticLinkItem: React.FC<StatisticLinkItemProps> = (props) => {
  const { id, link, date, period, deleted = false, deletedAt = '' } = props;
  const { isCopied, isButtonDisabled, copyToClipboard } = useCopyToClipboard();

  const dispatch = useAppDispatch();

  const count = useSelector(selectLinkStatsCount(id));
  const status = useSelector(selectLinkStatsCountStatus(id));

  const handleItemClick = () => {
    console.log('item');
  };

  const handleRestoreLink = () => {
    dispatch(restoreLink(id));
  };

  const handleCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    copyToClipboard(link);
  };

  React.useEffect(() => {
    dispatch(
      getLinkStatsCount({
        id,
        period,
      }),
    );
  }, [dispatch, id, period]);

  const LinkElement = () => (
    <div className={cls.statisticLinkItem} onClick={handleItemClick}>
      <button
        disabled={isButtonDisabled}
        onClick={handleCopyClick}
        type="button"
        title={link}
        className={clsx(cls.statisticLinkItem_link, cls.statisticLinkItem_value)}>
        <span>{link}</span>
        <span>{isCopied ? <CopiedIcon /> : <CopyIcon />}</span>
      </button>
      <div className={clsx(cls.statisticLinkItem_date, cls.statisticLinkItem_value)}>{date}</div>
      {status === LoadingStatus.FULFILLED ? (
        <div className={clsx(cls.statisticLinkItem_count, cls.statisticLinkItem_value)}>
          {formatNumberWithDelimiter(Number(count), ' ')}
        </div>
      ) : (
        <StatisticLinkSkeleton />
      )}
    </div>
  );

  return deleted ? (
    <div className={cls.statisticLinkItem_deleted}>
      <LinkElement />
      <div className={cls.statisticLinkItem_deleted_box}>
        <div className={cls.statisticLinkItem_deleted_timer}>
          <TimerIcon />
          <span>{deletedAt ? getDaysUntilInactive(deletedAt) : 'Скоро...'}</span>
        </div>
        <Button onClick={handleRestoreLink} className={cls.statisticLinkItem_deleted_button}>
          Вернуть
        </Button>
      </div>
    </div>
  ) : (
    <LinkElement />
  );
};
