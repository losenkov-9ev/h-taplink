import { createReduxStore } from './store';
import { useDispatch } from 'react-redux';
import { AuthSchema } from '@/workflows/admin/entities/AuthForm';
import { TabSchema } from '@/workflows/admin/features/Tab';
import { AppearanceSchema } from '@/workflows/admin/widgets/Appearance';
import { FillingSchema } from '@/workflows/admin/widgets/Filling';
import { LinksSchema } from '@/workflows/admin/entities/ContentLinks';
import { StatisticsSchema } from '@/workflows/admin/pages/Statistics';

export interface StateSchema {
  auth: AuthSchema;
  tab: TabSchema;
  appearance: AppearanceSchema;
  filling: FillingSchema;
  links: LinksSchema;
  statistics: StatisticsSchema;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
