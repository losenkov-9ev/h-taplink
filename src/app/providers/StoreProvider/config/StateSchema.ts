import { createReduxStore } from './store';
import { useDispatch } from 'react-redux';
import { AuthSchema } from '@/workflows/admin/entities/AuthForm';
import { TabSchema } from '@/workflows/admin/features/Tab';
import { AppearanceSchema } from '@/workflows/admin/widgets/Appearance/model/types/appearanceSchema';
import { FillingSchema } from '@/workflows/admin/widgets/Filling/model/types/fillingSchema';

export interface StateSchema {
  auth: AuthSchema;
  tab: TabSchema;
  appearence: AppearanceSchema;
  filling: FillingSchema;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
