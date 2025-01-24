import React from 'react';

import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { getTab } from '@/workflows/admin/features/Tab/model/slice/thunk';
import {
  getAppearance,
  getBackgrounds,
} from '@/workflows/admin/widgets/Appearance/model/slice/thunks';
import { getLinks } from '@/workflows/admin/entities/ContentLinks';
import { getContent } from '@/workflows/admin/widgets/Filling/model/slice/thunk';

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
