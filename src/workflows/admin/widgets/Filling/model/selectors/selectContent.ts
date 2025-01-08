import { StateSchema } from '@/app/providers/StoreProvider';

export const selectContent = (state: StateSchema) => state.filling.data;
