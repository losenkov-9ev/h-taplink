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

interface StatsCountElement {
  status: LoadingStatus;
  data: number;
}

export interface StatisticsSchema {
  site: StatsElement;
  links: Record<number, StatsElement>;
  linksCount: Record<number, StatsCountElement>;
}
