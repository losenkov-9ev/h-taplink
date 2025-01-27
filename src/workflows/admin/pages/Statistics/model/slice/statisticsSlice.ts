import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import { getStatsProps, StatisticsSchema, StatsData } from '../types/statisticsSchema';
import { getLinkStats, getLinkStatsCount, getSiteStats } from './thunks';

const defaultData: StatsData = {
  labels: [''],
  dataPoints: [0],
};

const initialState: StatisticsSchema = {
  site: {
    status: LoadingStatus.LOADING,
    data: defaultData as StatsData,
  },
  links: {},
  linksCount: {},
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSiteStats.pending, (state: StatisticsSchema) => {
        state.site = {
          status: LoadingStatus.LOADING,
          data: defaultData,
        };
      })
      .addCase(
        getSiteStats.fulfilled,
        (state: StatisticsSchema, action: PayloadAction<StatsData>) => {
          state.site = {
            status: LoadingStatus.FULFILLED,
            data: action.payload,
          };
        },
      )
      .addCase(getSiteStats.rejected, (state: StatisticsSchema) => {
        state.site = {
          status: LoadingStatus.REJECTED,
          data: defaultData,
        };
      })

      .addCase(
        getLinkStats.pending,
        (
          state: StatisticsSchema,
          action: PayloadAction<undefined, string, { arg: getStatsProps }, never>,
        ) => {
          const { id } = action.meta.arg;

          state.links[id] = {
            status: LoadingStatus.LOADING,
            data: defaultData,
          };
        },
      )
      .addCase(
        getLinkStats.fulfilled,
        (
          state: StatisticsSchema,
          action: PayloadAction<StatsData, string, { arg: getStatsProps }, never>,
        ) => {
          const { id } = action.meta.arg;
          state.links[id] = {
            status: LoadingStatus.FULFILLED,
            data: action.payload,
          };
        },
      )
      .addCase(
        getLinkStats.rejected,
        (
          state: StatisticsSchema,
          action: PayloadAction<unknown, string, { arg: getStatsProps }, never>,
        ) => {
          const { id } = action.meta.arg;
          state.links[id] = {
            status: LoadingStatus.REJECTED,
            data: defaultData,
          };
        },
      )

      .addCase(
        getLinkStatsCount.pending,
        (
          state: StatisticsSchema,
          action: PayloadAction<undefined, string, { arg: getStatsProps }, never>,
        ) => {
          const { id } = action.meta.arg;

          state.linksCount[id] = {
            status: LoadingStatus.LOADING,
            data: 0,
          };
        },
      )
      .addCase(
        getLinkStatsCount.fulfilled,
        (
          state: StatisticsSchema,
          action: PayloadAction<number, string, { arg: getStatsProps }, never>,
        ) => {
          const { id } = action.meta.arg;
          state.linksCount[id] = {
            status: LoadingStatus.FULFILLED,
            data: action.payload,
          };
        },
      )
      .addCase(
        getLinkStatsCount.rejected,
        (
          state: StatisticsSchema,
          action: PayloadAction<unknown, string, { arg: getStatsProps }, never>,
        ) => {
          const { id } = action.meta.arg;
          state.linksCount[id] = {
            status: LoadingStatus.REJECTED,
            data: 0,
          };
        },
      );
  },
});

export const statisticsReducer = statisticsSlice.reducer;
