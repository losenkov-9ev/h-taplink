import { StateSchema } from '@/app/providers/StoreProvider';

export const selectLinks = (state: StateSchema) => state.filling.data.links;
