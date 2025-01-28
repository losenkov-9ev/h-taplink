import React from 'react';

import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { getTab } from '@/workflows/admin/features/Tab';
import { getAppearance, getBackgrounds } from '@/workflows/admin/widgets/Appearance';
import { getLinks } from '@/workflows/admin/entities/ContentLinks';
import { getContent } from '@/workflows/admin/widgets/Filling';

export const useFetchPublicData = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTab());
    dispatch(getAppearance());
    dispatch(getBackgrounds());
    dispatch(getLinks());
    dispatch(getContent());
  }, [dispatch]);
};
