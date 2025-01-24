import { StateSchema } from '@/app/providers/StoreProvider';
import { CURRENT_SITE_ID } from '@/workflows/admin/features/Chart/lib/config/constants';
import { createSelector } from '@reduxjs/toolkit';

export const selectLinkStats = (id: number) => (state: StateSchema) =>
  state.statistics.links[id]?.data;

export const selectSiteStats = (state: StateSchema) => state.statistics.site.data;

export const selectLinkStatsCount = (id: number) =>
  createSelector([selectLinkStats(id)], (linkStats) => {
    return linkStats?.dataPoints
      ? linkStats.dataPoints.reduce((acc, currentValue) => Number(acc) + Number(currentValue), 0)
      : 0;
  });

export const selectStats = (id: string) => (state: StateSchema) => {
  if (id === CURRENT_SITE_ID) {
    return selectSiteStats(state);
  } else {
    return selectLinkStats(Number(id))(state);
  }
};
