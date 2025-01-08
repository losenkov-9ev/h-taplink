import { StateSchema } from '@/app/providers/StoreProvider';

export const selectTabStatus = (state: StateSchema) => state.tab.status;
