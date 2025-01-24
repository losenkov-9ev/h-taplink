import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import { LinkItem, LinksSchema } from '../types/LinksSchema';
import { getLinks, restoreLink, updateLinks } from './thunks';

const initialState: LinksSchema = {
  status: LoadingStatus.LOADING,
  data: [],
};

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLinks.pending, (state: LinksSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(getLinks.fulfilled, (state: LinksSchema, action: PayloadAction<LinkItem[]>) => {
        state.status = LoadingStatus.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getLinks.rejected, (state: LinksSchema) => {
        state.status = LoadingStatus.REJECTED;
      })

      .addCase(updateLinks.pending, (state: LinksSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(updateLinks.fulfilled, (state: LinksSchema, action: PayloadAction<LinkItem[]>) => {
        state.status = LoadingStatus.FULFILLED;
        state.data = action.payload;
      })
      .addCase(updateLinks.rejected, (state: LinksSchema) => {
        state.status = LoadingStatus.REJECTED;
      })

      .addCase(restoreLink.pending, (state: LinksSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(restoreLink.fulfilled, (state: LinksSchema, action: PayloadAction<LinkItem[]>) => {
        state.status = LoadingStatus.FULFILLED;
        state.data = action.payload;
      })
      .addCase(restoreLink.rejected, (state: LinksSchema) => {
        state.status = LoadingStatus.REJECTED;
      });
  },
});

export const linksReducer = linksSlice.reducer;
