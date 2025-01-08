import { StateSchema } from '@/app/providers/StoreProvider';

export const selectCurrentDesign = (state: StateSchema) => state.appearence.data.design;
export const selectAllDesigns = (state: StateSchema) => state.appearence.designs.data;
