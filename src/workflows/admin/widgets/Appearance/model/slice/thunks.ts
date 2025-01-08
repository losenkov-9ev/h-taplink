import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@admin/shared/lib/config/AxiosConfig';

export const getAppearance = createAsyncThunk('appearance/getAppearance', async () => {
  const { data } = await axios.get('/api/appearance');
  return data;
});

export const updateAppearance = createAsyncThunk(
  'appearance/updateAppearance',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      console.log(formData.get('background_image'));

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
