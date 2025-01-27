import { StateSchema } from '@/app/providers/StoreProvider';

export const selectAuthError = (state: StateSchema) => state.auth.error;
