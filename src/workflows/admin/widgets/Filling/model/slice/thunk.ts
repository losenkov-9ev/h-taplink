import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../shared/lib/config/AxiosConfig';
import { FillingData } from '../types/fillingSchema';

export const getContent = createAsyncThunk('filling/getContent', async () => {
  const { data } = await axios.get('/api/content');
  return data;
});

export const updateContent = createAsyncThunk(
  'filling/updateContent',
  async (data: FillingData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/content', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
