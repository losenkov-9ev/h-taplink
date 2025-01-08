import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../shared/lib/config/AxiosConfig';

export const getTab = createAsyncThunk('tab/getTab', async () => {
  const { data } = await axios.get('/api/tab');
  return data;
});

export const updateTab = createAsyncThunk(
  'tab/updateTab',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/tab', formData, {
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
