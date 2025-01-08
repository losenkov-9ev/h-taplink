import { StateSchema } from '@/app/providers/StoreProvider';

export const selectIsAuth = (state: StateSchema) => state.auth.isAuth;
