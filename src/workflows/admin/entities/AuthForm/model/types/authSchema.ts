import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export interface AuthSchema {
  status: LoadingStatus;
  isAuth: boolean;
  error: string | null;
}
