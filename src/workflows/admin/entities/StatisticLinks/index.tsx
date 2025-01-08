import React from 'react';
import cls from './statisticLinks.module.scss';
import Select from '../../shared/ui/Select';
import clsx from 'clsx';
import { StatisticLinkItem } from './StatisticLinkItem/StatisticLinkItem';

const statisticLinksArray = [
  {
    link: 'https://link.com',
    date: '10.29.2024',
    count: 2162,
  },
  {
    link: 'https://link2.com',
    date: '11.05.2023',
    count: 3123,
  },
  {
    link: 'https://very-very-long-link3.com',
    date: '07.18.2022',
    count: 4234,
  },
  {
    link: 'https://link4.com',
    date: '02.14.2023',
    count: 5345,
  },
  {
    link: 'https://link5.com',
    date: '09.30.2021',
    count: 6456,
  },
  {
    link: 'https://link6.com',
    date: '12.25.2022',
    count: 7567,
  },
  {
    link: 'https://link7.com',
    date: '05.07.2024',
    count: 8678,
  },
  {
    link: 'https://link8.com',
    date: '08.12.2023',
    count: 9789,
  },
  {
    link: 'https://link9.com',
    date: '10.02.2022',
    count: 10890,
  },
  {
    link: 'https://link10.com',
    date: '03.15.2025',
    count: 11901,
  },
];

export const StatisticLinks: React.FC = () => {
  return (
    <div className={cls.statisticLinks}>
      <div className={cls.statisticLinks_head}>
        <h1 className={clsx(cls.statisticLinks_title, 'h-2')}>Переход по ссылкам</h1>
        <div className={cls.statisticLinks_controls}>
          <Select className={cls.statisticLinks_select} placeholder="За все время">
            <Select.Option value="all">За все время</Select.Option>
            <Select.Option value="month">За месяц</Select.Option>
            <Select.Option value="week">За неделю</Select.Option>
            <Select.Option value="day">За день</Select.Option>
          </Select>
        </div>
      </div>
      <div className={cls.statisticLinks_tableHead}>
        <div className={cls.statisticLinks_tableHead_item}>Ссылка</div>
        <div className={cls.statisticLinks_tableHead_item}>Дата создания</div>
        <div className={cls.statisticLinks_tableHead_item}>Переходов</div>
      </div>
      <div className={cls.statisticLinks_box}>
        {statisticLinksArray.map((item, idx) => (
          <StatisticLinkItem {...item} key={`${item.link}_${idx}`} />
        ))}
      </div>
    </div>
  );
};
