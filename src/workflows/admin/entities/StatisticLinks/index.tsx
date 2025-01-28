import React from 'react';
import cls from './statisticLinks.module.scss';
import Select from '../../shared/ui/Select';
import clsx from 'clsx';
import { StatisticLinkItem } from './StatisticLinkItem/StatisticLinkItem';
import { useSelector } from 'react-redux';
import { selectLinksData } from '../ContentLinks';
import { formatDate } from '@/shared/lib/formatDate';

import { removeProtocol } from '@/shared/lib/removeProtocol';
import { statsPeriodData } from '../../pages/Statistics';
import { useStatsPeriod } from '../../shared/lib/hooks/useStatsPeriod';

export const StatisticLinks: React.FC = () => {
  const links = useSelector(selectLinksData);
  const { period, handleChangePeriod } = useStatsPeriod();

  const sortedLinks = React.useMemo(() => {
    return [...links].sort((a, b) => {
      if (a.deleted === b.deleted) {
        return 0;
      }
      return a.deleted ? 1 : -1;
    });
  }, [links]);

  return (
    <div className={cls.statisticLinks}>
      <div className={cls.statisticLinks_head}>
        <h1 className={clsx(cls.statisticLinks_title, 'h-2')}>Переход по ссылкам</h1>
        <div className={cls.statisticLinks_controls}>
          <Select
            onChange={(_, raw) => handleChangePeriod(raw)}
            className={cls.statisticLinks_select}
            placeholder={statsPeriodData[period]}>
            {Object.keys(statsPeriodData).map((period_id, idx) => (
              <Select.Option key={idx} value={period_id}>
                {statsPeriodData[period_id as keyof typeof statsPeriodData]}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={cls.statisticLinks_tableHead}>
        <div className={cls.statisticLinks_tableHead_item}>Ссылка</div>
        <div className={cls.statisticLinks_tableHead_item}>Дата создания</div>
        <div className={cls.statisticLinks_tableHead_item}>Переходов</div>
      </div>
      <div className={cls.statisticLinks_box}>
        {sortedLinks.map((item, idx) => (
          <StatisticLinkItem
            id={item.id}
            deleted={item.deleted}
            deletedAt={item.deletedAt}
            link={removeProtocol(item.url)}
            date={formatDate(item.createdAt)}
            period={period}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};
