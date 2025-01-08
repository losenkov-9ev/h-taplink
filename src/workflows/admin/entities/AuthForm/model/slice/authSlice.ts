import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import { AuthSchema } from '../types/authSchema';
import { fetchAuthData, fetchAuthMe, fetchLogout } from './thunk';
import { ErrorPayload } from '@/workflows/admin/shared/lib/types/errors';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthSchema = {
  status: LoadingStatus.LOADING,
  isAuth: false,
  error: null,
};

const onLogout = () => {
  document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthData.pending, (state: AuthSchema) => {
      state.error = null;
      state.status = LoadingStatus.LOADING;
    });
    builder.addCase(fetchAuthData.fulfilled, (state: AuthSchema) => {
      state.status = LoadingStatus.FULFILLED;
    });
    builder.addCase(fetchAuthData.rejected, (state: AuthSchema, action: ErrorPayload) => {
      state.error = action.payload?.message || null;
      state.status = LoadingStatus.REJECTED;
    });
    builder.addCase(fetchAuthMe.pending, (state: AuthSchema) => {
      state.isAuth = false;
      state.status = LoadingStatus.LOADING;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state: AuthSchema) => {
      state.isAuth = true;
      state.status = LoadingStatus.FULFILLED;
    });
    builder.addCase(fetchAuthMe.rejected, (state: AuthSchema) => {
      state.isAuth = false;
      state.status = LoadingStatus.REJECTED;
    });
    builder.addCase(fetchLogout.pending, onLogout);
    builder.addCase(fetchLogout.fulfilled, onLogout);
    builder.addCase(fetchLogout.rejected, onLogout);
  },
});

export const authReducer = authSlice.reducer;
