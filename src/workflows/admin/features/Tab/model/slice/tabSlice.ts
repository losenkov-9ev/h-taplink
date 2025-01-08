import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabData, TabSchema } from '../types/tabSchema';
import { getTab, updateTab } from './thunk';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

const initialState: TabSchema = {
  status: LoadingStatus.LOADING,
  data: {
    name: 'Home',
    favicon: '',
  },
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    updateTab: (state, action: PayloadAction<TabData>) => {
      state.data.name = action.payload.name;
      state.data.favicon = action.payload.favicon;

      localStorage.setItem('favicon', action.payload.favicon);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTab.pending, (state: TabSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(getTab.fulfilled, (state: TabSchema, action: PayloadAction<TabData>) => {
        state.status = LoadingStatus.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getTab.rejected, (state: TabSchema) => {
        state.status = LoadingStatus.REJECTED;
      })

      .addCase(updateTab.pending, (state: TabSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(updateTab.fulfilled, (state: TabSchema, action: PayloadAction<TabData>) => {
        state.status = LoadingStatus.FULFILLED;
        state.data = action.payload;
      })
      .addCase(updateTab.rejected, (state: TabSchema) => {
        state.status = LoadingStatus.REJECTED;
      });
  },
});

export const tabReducer = tabSlice.reducer;
export const tabActions = tabSlice.actions;
