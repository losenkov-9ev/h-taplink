import { StateSchema } from '@/app/providers/StoreProvider';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import { createSelector } from '@reduxjs/toolkit';

export const selectIsAppearanceLoading = (state: StateSchema) => state.appearence.status;
export const selectIsDesignsLoading = (state: StateSchema) => state.appearence.designs.status;

export const selectDesignStatus = createSelector(
  [selectIsDesignsLoading, selectIsAppearanceLoading],
  (appearanceStatus, designStatus) => {
    if (appearanceStatus === LoadingStatus.FULFILLED && designStatus === LoadingStatus.FULFILLED) {
      return LoadingStatus.FULFILLED;
    } else if (
      designStatus !== LoadingStatus.REJECTED &&
      appearanceStatus !== LoadingStatus.REJECTED
    ) {
      return LoadingStatus.LOADING;
    } else {
      return LoadingStatus.REJECTED;
    }
  },
);
