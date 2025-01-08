import { AdminRoutePath } from '@/workflows/admin/app/config/routes';

export const createLinkPath = (path: string): string => {
  return path ? `/admin/${path}/` : `/admin/${AdminRoutePath.settings}/`;
};
