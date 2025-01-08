import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export interface LinkItem {
  name: string;
  url: string;
}

export interface FillingData {
  title_1: string;
  text_1: string;
  title_2: string;
  text_2: string;
  title_3: string;
  text_3: string;
  title_4: string;
  text_4: string;
  links: LinkItem[];
}

export interface FillingSchema {
  status: LoadingStatus;
  data: FillingData;
}
