import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export interface getStatsProps {
  id: number;
  period: StatsPeriod;
}

export enum StatsPeriod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  ALL = 'all',
}

export interface StatsData {
  labels: string[];
  dataPoints: number[];
}

interface StatsElement {
  status: LoadingStatus;
  data: StatsData;
}

export interface StatisticsSchema {
  site: StatsElement;
  links: Record<number, StatsElement>;
}
