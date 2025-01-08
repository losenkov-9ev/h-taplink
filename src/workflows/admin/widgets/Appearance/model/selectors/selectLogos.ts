import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

const selectFirstLogo = (state: StateSchema) => state.appearence.data.logo_1;
const selectSecondLogo = (state: StateSchema) => state.appearence.data.logo_2;

export const selectLogotypes = createSelector(
  [selectFirstLogo, selectSecondLogo],
  (firstLogo, secondLogo) => ({ firstLogo, secondLogo }),
);
