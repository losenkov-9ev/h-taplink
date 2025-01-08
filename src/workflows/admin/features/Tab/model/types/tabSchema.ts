import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export interface TabData {
  name: string;
  favicon: string;
}

export interface TabSchema {
  status: LoadingStatus;
  data: TabData;
}
