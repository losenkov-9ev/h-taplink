import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

const selectDarkThemeColors = (state: StateSchema) => state.appearance.data.dark_theme_colors;
const selectLightThemeColors = (state: StateSchema) => state.appearance.data.light_theme_colors;

export const selectColors = createSelector(
  [selectDarkThemeColors, selectLightThemeColors],
  (darkColors, lightColors) => ({ darkColors, lightColors }),
);
