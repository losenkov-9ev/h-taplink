import React from 'react';
import cls from './Chart.module.scss';
import { Line } from 'react-chartjs-2';
import { createChartConfig } from '../lib/config/config';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Select from '../../../shared/ui/Select';
import { calculateStepSize } from '../lib/calculateStepSize';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectStats } from '@/workflows/admin/pages/Statistics/model/selectors/selectData';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { getLinkStats, getSiteStats, statsPeriodData } from '@/workflows/admin/pages/Statistics';
import { useStatsPeriod } from '@/workflows/admin/shared/lib/hooks/useStatsPeriod';
import { selectLinksData } from '@/workflows/admin/entities/ContentLinks/model/selectors/selectData';
import { CURRENT_SITE_ID } from '../lib/config/constants';

ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const Chart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [statsId, setStatsId] = React.useState<string>(CURRENT_SITE_ID);

  const { labels, dataPoints } = useSelector(selectStats(statsId));
  const { period, handleChangePeriod } = useStatsPeriod();

  const links = useSelector(selectLinksData);

  const maxData = Math.max(...dataPoints);
  const minData = Math.min(...dataPoints);
  const customStepSize = calculateStepSize(minData, maxData, 5);

  const { data, options } = createChartConfig({ labels, dataPoints, customStepSize });

  const handeleChangeStatsId = (id: string) => {
    setStatsId(id);
  };

  React.useEffect(() => {
    if (statsId === CURRENT_SITE_ID) dispatch(getSiteStats({ period }));
    else dispatch(getLinkStats({ id: Number(statsId), period }));
  }, [dispatch, period, statsId]);

  return (
    <>
      <h1 className={clsx(cls.stats_title, 'h-1')}>Статистика</h1>
      <div className={cls.chart}>
        <div className={cls.chart_inner}>
          <div className={cls.chart_head}>
            <h1 className={clsx(cls.chart_title, 'h-2')}>График выручки</h1>
            <div className={cls.chart_controls}>
              <Select
                onChange={(_, raw) => handeleChangeStatsId(raw)}
                className={cls.chart_select}
                placeholder="Текущий сайт">
                <Select.Option value={CURRENT_SITE_ID}>Текущий сайт</Select.Option>
                {links.map((link, idx) => (
                  <Select.Option key={idx} value={String(link.id)}>
                    {link.name}
                  </Select.Option>
                ))}
              </Select>
              <Select
                onChange={(_, raw) => handleChangePeriod(raw)}
                className={cls.chart_select}
                placeholder={statsPeriodData[period]}>
                {Object.keys(statsPeriodData).map((period_id, idx) => (
                  <Select.Option key={idx} value={period_id}>
                    {statsPeriodData[period_id as keyof typeof statsPeriodData]}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className={cls.chart_box}>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};
