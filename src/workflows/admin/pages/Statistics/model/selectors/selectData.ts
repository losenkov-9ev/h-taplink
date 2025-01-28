import { StateSchema } from '@/app/providers/StoreProvider';
import { CURRENT_SITE_ID } from '@/workflows/admin/features/Chart';

export const selectLinkStats = (id: number) => (state: StateSchema) =>
  state.statistics.links[id]?.data || {
    labels: [''],
    dataPoints: [0],
  };

export const selectSiteStats = (state: StateSchema) => state.statistics.site.data;

export const selectLinkStatsCount = (id: number) => (state: StateSchema) =>
  state.statistics.linksCount[id]?.data;

export const selectStats = (id: string) => (state: StateSchema) => {
  if (id === CURRENT_SITE_ID) {
    return selectSiteStats(state);
  } else {
    return selectLinkStats(Number(id))(state);
  }
};
