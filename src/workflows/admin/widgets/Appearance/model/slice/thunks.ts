import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@admin/shared/lib/config/AxiosConfig';
import { ConfigItem } from '../types/appearanceSchema';
import { StateSchema } from '@/app/providers/StoreProvider';
import { isAxiosError } from 'axios';

export const getAppearance = createAsyncThunk('appearance/getAppearance', async () => {
  const { data } = await axios.get('/api/appearance');
  return data;
});

export const updateAppearance = createAsyncThunk(
  'appearance/updateAppearance',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/appearance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getDesignTypes = createAsyncThunk('appearance/design', async () => {
  const { data } = await axios.get('/api/appearance/design');
  return data;
});

export const getBackgrounds = createAsyncThunk('appearance/background', async () => {
  const { data } = await axios.get('/api/appearance/backgrounds');
  return data;
});

export const getConfig = createAsyncThunk<
  ConfigItem,
  string,
  { state: StateSchema; rejectValue: string }
>('appearance/getConfig', async (id, { rejectWithValue, getState }) => {
  const state = getState();
  const existingConfig = state.appearance.configs.data[id];

  if (existingConfig) {
    // Если конфигурация уже существует, возвращаем её напрямую
    return existingConfig;
  }

  try {
    const response = await axios.get<ConfigItem>(`/api/appearance/config/${id}`);
    return response.data;
  } catch (error) {
    let errorMessage = 'Ошибка при получении конфигурации';

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('getConfig error:', error);
    return rejectWithValue(errorMessage);
  }
});
