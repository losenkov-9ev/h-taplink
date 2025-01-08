import { StateSchema } from '@/app/providers/StoreProvider';

export const selectContentStatus = (state: StateSchema) => state.filling.status;
