import { StateSchema } from '@/app/providers/StoreProvider';

export const selectCurrentDesign = (state: StateSchema) => state.appearance.data.design;
export const selectAllDesigns = (state: StateSchema) => state.appearance.designs.data;
