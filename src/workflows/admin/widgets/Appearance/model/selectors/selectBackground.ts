import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { selectIsAppearanceLoading } from './selectIsLoading';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export const selectCurrentBg = (state: StateSchema) => state.appearence.data.background;
export const selectBackgroundFile = (state: StateSchema) => state.appearence.data.background_image;
export const selectAllBackgrounds = (state: StateSchema) => state.appearence.backgrounds.data;
export const selectAllBackgroundsStatus = (state: StateSchema) =>
  state.appearence.backgrounds.status;

export const selectBackgroundStatus = createSelector(
  [selectAllBackgroundsStatus, selectIsAppearanceLoading],
  (appearanceStatus, backgroundStatus) => {
    if (
      appearanceStatus === LoadingStatus.FULFILLED &&
      backgroundStatus === LoadingStatus.FULFILLED
    ) {
      return LoadingStatus.FULFILLED;
    } else if (
      backgroundStatus !== LoadingStatus.REJECTED &&
      appearanceStatus !== LoadingStatus.REJECTED
    ) {
      return LoadingStatus.LOADING;
    } else {
      return LoadingStatus.REJECTED;
    }
  },
);
