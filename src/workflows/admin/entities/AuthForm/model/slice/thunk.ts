import { handleAxiosError } from '@/workflows/admin/shared/lib/utils/handleAxiosError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPIError, AuthParams } from '../types/thunkTypes';

import axios from '@admin/shared/lib/config/AxiosConfig';

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  async (params: AuthParams, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login/', params);
      await dispatch(fetchAuthMe());
      return data;
    } catch (error) {
      return rejectWithValue((error as AuthAPIError).response?.data.error || 'Ошибка входа');
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
