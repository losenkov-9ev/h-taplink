import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LinkItem } from '../types/LinksSchema';
import axios from '../../../../shared/lib/config/AxiosConfig';

export const getLinks = createAsyncThunk('links/getLinks', async () => {
  const { data } = await axios.get('/api/links');
  return data;
});

export const updateLinks = createAsyncThunk(
  'links/updateLinks',
  async (data: Pick<LinkItem, 'name' | 'url'>[], { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/links', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const restoreLink = createAsyncThunk(
  'links/restoreLink',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/links/${id}/restore`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
