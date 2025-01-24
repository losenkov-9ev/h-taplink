import { StateSchema } from '@/app/providers/StoreProvider';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export const selectLinkStatsStatus = (id: number) => (state: StateSchema) =>
  state.statistics.links[id]?.status || LoadingStatus.LOADING;
