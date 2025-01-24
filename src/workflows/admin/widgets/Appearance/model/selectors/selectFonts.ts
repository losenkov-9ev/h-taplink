import { StateSchema } from '@/app/providers/StoreProvider';

export const selectFont = (state: StateSchema) => state.appearance.data.font;
