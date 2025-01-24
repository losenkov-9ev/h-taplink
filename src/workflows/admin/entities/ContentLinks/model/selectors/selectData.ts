import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const selectLinksData = (state: StateSchema) => state.links.data;

export const selectActiveLinks = createSelector([selectLinksData], (data) =>
  data.filter((link) => !link.deleted),
);
