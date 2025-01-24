import { StateSchema } from '@/app/providers/StoreProvider';

export const selectXmasMode = (state: StateSchema) => state.appearance.data.new_year_mode;
