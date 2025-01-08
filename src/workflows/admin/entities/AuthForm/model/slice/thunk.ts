import { handleAxiosError, RejectType } from '@/workflows/admin/shared/lib/utils/handleAxiosError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPIResponce, AuthParams } from '../types/thunkTypes';

import axios from '@admin/shared/lib/config/AxiosConfig';

export const fetchAuthData = createAsyncThunk<AuthAPIResponce, AuthParams, RejectType>(
  'auth/fetchAuthData',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login/', params);
      await dispatch(fetchAuthMe());
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, 'Ошибка авторизации'));
    }
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/auth/me/');
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error, 'Ошибка авторизации'));
  }
});

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async (_, { dispatch }) => {
  const { data } = await axios.post('/auth/logout/');
  await dispatch(fetchAuthMe());

  return data;
});
