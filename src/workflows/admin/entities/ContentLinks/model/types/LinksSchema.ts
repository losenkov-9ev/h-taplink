import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export interface LinkItem {
  id: number;
  name: string;
  url: string;
  createdAt: Date;
  deleted: boolean;
  deletedAt: Date;
}

export interface LinksSchema {
  status: LoadingStatus;
  data: LinkItem[];
}
