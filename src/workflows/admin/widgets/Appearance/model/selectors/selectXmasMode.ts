import { StateSchema } from '@/app/providers/StoreProvider';

export const selectXmasMode = (state: StateSchema) => state.appearence.data.new_year_mode;
