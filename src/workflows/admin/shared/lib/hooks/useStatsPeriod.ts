import React from 'react';
import { StatsPeriod, statsPeriodData } from '@/workflows/admin/pages/Statistics';

export const useStatsPeriod = () => {
  const PERIOD_KEYS = Object.keys(statsPeriodData) as StatsPeriod[];
  const [period, setPeriod] = React.useState<StatsPeriod>(StatsPeriod.YEAR);

  const handleChangePeriod = React.useCallback(
    (periodId: string) => {
      setPeriod(
        PERIOD_KEYS.includes(periodId as StatsPeriod)
          ? (periodId as StatsPeriod)
          : StatsPeriod.YEAR,
      );
    },
    [PERIOD_KEYS],
  );

  return { period, handleChangePeriod };
};
