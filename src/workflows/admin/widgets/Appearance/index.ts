export type { AppearanceSchema } from './model/types/appearanceSchema.ts';

export {
  getAppearance,
  updateAppearance,
  getDesignTypes,
  getBackgrounds,
  getConfig,
} from './model/slice/thunks.ts';

export { appearanceReducer } from './model/slice/appearanceSlice.ts';
export { Appearance } from './ui/Appearance.tsx';

// selectors
export { selectIsAppearanceLoading } from './model/selectors/selectIsLoading.ts';
export { selectXmasMode } from './model/selectors/selectXmasMode.ts';

export {
  selectAllBackgrounds,
  selectBackgroundFile,
  selectBackgroundStatus,
  selectCurrentBg,
  selectAllBackgroundsStatus,
} from './model/selectors/selectBackground.ts';

export { selectIsConfigurationsLoading } from './model/selectors/selectIsLoading.ts';

export { selectColors } from './model/selectors/selectColors.ts';
export { selectCurrentDesign, selectAllDesigns } from './model/selectors/selectDesign.ts';
export { selectDesignStatus } from './model/selectors/selectIsLoading.ts';
export { selectFont } from './model/selectors/selectFonts.ts';
export { selectLogotypes } from './model/selectors/selectLogos.ts';
