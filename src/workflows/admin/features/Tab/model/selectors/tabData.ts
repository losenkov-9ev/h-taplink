import { StateSchema } from '@/app/providers/StoreProvider';

export const selectTabData = (state: StateSchema) => state.tab.data;
