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

interface ChartProps {
  labels: string[];
  dataPoints: number[];
}

export const Chart: React.FC<ChartProps> = ({ labels, dataPoints }) => {
  const maxData = Math.max(...dataPoints);
  const minData = Math.min(...dataPoints);
  const customStepSize = calculateStepSize(minData, maxData, 10);

  const { data, options } = createChartConfig({ labels, dataPoints, customStepSize });

  return (
    <>
      <h1 className={clsx(cls.stats_title, 'h-1')}>Статистика</h1>
      <div className={cls.chart}>
        <div className={cls.chart_inner}>
          <div className={cls.chart_head}>
            <h1 className={clsx(cls.chart_title, 'h-2')}>График выручки</h1>
            <div className={cls.chart_controls}>
              <Select className={cls.chart_select} placeholder="За все время">
                <Select.Option value="all">За все время</Select.Option>
                <Select.Option value="month">За месяц</Select.Option>
                <Select.Option value="week">За неделю</Select.Option>
                <Select.Option value="day">За день</Select.Option>
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
