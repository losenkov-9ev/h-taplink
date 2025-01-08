import { StateSchema } from '@/app/providers/StoreProvider';

export const selectAuthStatus = (state: StateSchema) => state.auth.status;
