import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../shared/lib/config/AxiosConfig';

export const getContent = createAsyncThunk('filling/getContent', async () => {
  const { data } = await axios.get('/api/content');
  return data;
});
