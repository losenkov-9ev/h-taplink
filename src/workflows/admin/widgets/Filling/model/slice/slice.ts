import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import { FillingData, FillingSchema } from '../types/fillingSchema';
import { getContent, updateContent } from './thunk';

const initialState: FillingSchema = {
  status: LoadingStatus.LOADING,
  data: {
    title_1: '',
    text_1: '',
    title_2: '',
    text_2: '',
    title_3: '',
    text_3: '',
    title_4: '',
    text_4: '',
  },
};

export const fillingSlice = createSlice({
  name: 'filling',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getContent.pending, (state: FillingSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(getContent.fulfilled, (state: FillingSchema, action: PayloadAction<FillingData>) => {
        state.status = LoadingStatus.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getContent.rejected, (state: FillingSchema) => {
        state.status = LoadingStatus.REJECTED;
      })

      .addCase(updateContent.pending, (state: FillingSchema) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(
        updateContent.fulfilled,
        (state: FillingSchema, action: PayloadAction<FillingData>) => {
          state.status = LoadingStatus.FULFILLED;
          state.data = action.payload;
        },
      )
      .addCase(updateContent.rejected, (state: FillingSchema) => {
        state.status = LoadingStatus.REJECTED;
      });
  },
});

export const fillingReducer = fillingSlice.reducer;
