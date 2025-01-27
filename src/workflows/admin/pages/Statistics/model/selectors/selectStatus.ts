import { StateSchema } from '@/app/providers/StoreProvider';
import { CURRENT_SITE_ID } from '@/workflows/admin/features/Chart/lib/config/constants';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export const selectLinkStatsStatus = (id: number) => (state: StateSchema) =>
  state.statistics.links[id]?.status || LoadingStatus.LOADING;

export const selectLinkStatsCountStatus = (id: number) => (state: StateSchema) =>
  state.statistics.linksCount[id]?.status || LoadingStatus.LOADING;

export const selectSiteStatsStaus = (state: StateSchema) => state.statistics.site.status;

export const selectStatsStatus = (id: string) => (state: StateSchema) => {
  if (id === CURRENT_SITE_ID) {
    return selectSiteStatsStaus(state);
  } else {
    return selectLinkStatsStatus(Number(id))(state);
  }
};
