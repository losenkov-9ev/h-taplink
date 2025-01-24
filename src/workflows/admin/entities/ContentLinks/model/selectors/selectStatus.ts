import { StateSchema } from '@/app/providers/StoreProvider';

export const selectLinksStatus = (state: StateSchema) => state.links.status;
