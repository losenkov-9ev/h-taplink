import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import {
  AppearanceData,
  AppearanceSchema,
  BackgroundItem,
  ConfigItem,
  DesignItem,
} from '../types/appearanceSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getAppearance,
  getBackgrounds,
  getConfig,
  getDesignTypes,
  updateAppearance,
} from './thunks';

const initialState: AppearanceSchema = {
  status: LoadingStatus.LOADING,
  configs: {
    status: LoadingStatus.LOADING,
    data: {},
  },
  designs: {
    status: LoadingStatus.LOADING,
    data: [],
  },
  backgrounds: {
    status: LoadingStatus.LOADING,
    data: [],
  },
  data: {
    new_year_mode: false,
    design: '',
    background: '',
    logo_1: '',
    logo_2: '',
    background_image: '',
    light_theme_colors: {
      text: '#0A0A0A',
      icons: '#0A0A0A',
      buttons: '#F5F5F5',
      background: '#FFFFFF',
    },
    dark_theme_colors: {
      text: '#0A0A0A',
      icons: '#0A0A0A',
      buttons: '#F5F5F5',
      background: '#FFFFFF',
    },
    font: 'Aeroport',
  },
};

export const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAppearance.pending, (state: AppearanceSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(
        getAppearance.fulfilled,
        (state: AppearanceSchema, action: PayloadAction<AppearanceData>) => {
          state.status = LoadingStatus.FULFILLED;
          state.configs.status = LoadingStatus.FULFILLED;
          state.data = action.payload;
        },
      )
      .addCase(getAppearance.rejected, (state: AppearanceSchema) => {
        state.status = LoadingStatus.REJECTED;
      })

      .addCase(updateAppearance.pending, (state: AppearanceSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(
        updateAppearance.fulfilled,
        (state: AppearanceSchema, action: PayloadAction<AppearanceData>) => {
          state.status = LoadingStatus.FULFILLED;
          state.data = action.payload;
        },
      )
      .addCase(updateAppearance.rejected, (state: AppearanceSchema) => {
        state.status = LoadingStatus.REJECTED;
      })

      .addCase(getDesignTypes.pending, (state: AppearanceSchema) => {
        state.designs.status = LoadingStatus.LOADING;
      })
      .addCase(
        getDesignTypes.fulfilled,
        (state: AppearanceSchema, action: PayloadAction<DesignItem[]>) => {
          state.designs.status = LoadingStatus.FULFILLED;
          state.designs.data = action.payload;
        },
      )
      .addCase(getDesignTypes.rejected, (state: AppearanceSchema) => {
        state.designs.status = LoadingStatus.REJECTED;
      })

      .addCase(getBackgrounds.pending, (state: AppearanceSchema) => {
        state.backgrounds.status = LoadingStatus.LOADING;
      })
      .addCase(
        getBackgrounds.fulfilled,
        (state: AppearanceSchema, action: PayloadAction<BackgroundItem[]>) => {
          state.backgrounds.status = LoadingStatus.FULFILLED;
          state.backgrounds.data = action.payload;
        },
      )
      .addCase(getBackgrounds.rejected, (state: AppearanceSchema) => {
        state.backgrounds.status = LoadingStatus.REJECTED;
      })

      .addCase(getConfig.pending, (state: AppearanceSchema) => {
        state.configs.status = LoadingStatus.LOADING;
      })
      .addCase(
        getConfig.fulfilled,
        (
          state: AppearanceSchema,
          action: PayloadAction<ConfigItem, string, { arg: string }, never>,
        ) => {
          state.configs.status = LoadingStatus.FULFILLED;

          const id = action.meta.arg;
          state.configs.data[id] = action.payload;

          state.data.dark_theme_colors = state.configs.data[id].dark_theme_colors;
          state.data.light_theme_colors = state.configs.data[id].light_theme_colors;
          state.data.background = state.configs.data[id].background;
        },
      )
      .addCase(getConfig.rejected, (state: AppearanceSchema) => {
        state.configs.status = LoadingStatus.REJECTED;
      });
  },
});

export const appearanceReducer = appearanceSlice.reducer;
export const appearanceActions = appearanceSlice.actions;
