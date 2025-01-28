import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';

// Import reducers
import { authReducer } from '@/workflows/admin/entities/AuthForm';
import { tabReducer } from '@/workflows/admin/features/Tab';
import { appearanceReducer } from '@/workflows/admin/widgets/Appearance';
import { fillingReducer } from '@/workflows/admin/widgets/Filling';
import { linksReducer } from '@/workflows/admin/entities/ContentLinks';
import { statisticsReducer } from '@/workflows/admin/pages/Statistics';

export function createReduxStore(initialState: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    auth: authReducer,
    tab: tabReducer,
    appearance: appearanceReducer,
    filling: fillingReducer,
    links: linksReducer,
    statistics: statisticsReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: import.meta.env.VITE_IS_DEV,
    preloadedState: initialState,
  });
}
