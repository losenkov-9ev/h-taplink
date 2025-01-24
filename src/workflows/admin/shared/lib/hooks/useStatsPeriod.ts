import { StatsPeriod, statsPeriodData } from '@/workflows/admin/pages/Statistics';
import React from 'react';

const PERIOD_KEYS = Object.keys(statsPeriodData) as StatsPeriod[];

export const useStatsPeriod = () => {
  const [period, setPeriod] = React.useState<StatsPeriod>(StatsPeriod.YEAR);

  const handleChangePeriod = React.useCallback((periodId: string) => {
    setPeriod(
      PERIOD_KEYS.includes(periodId as StatsPeriod) ? (periodId as StatsPeriod) : StatsPeriod.YEAR,
    );
  }, []);

  return { period, handleChangePeriod };
};
