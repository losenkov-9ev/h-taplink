import axios from '../../../../shared/lib/config/AxiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStatsProps } from '../types/statisticsSchema';

export const getSiteStats = createAsyncThunk(
  'statistics/getSiteStats',
  async ({ period }: Omit<getStatsProps, 'id'>) => {
    const { data } = await axios.get(`/api/stats/site?period=${period}`);
    return data;
  },
);

export const getLinkStats = createAsyncThunk(
  'statistics/getLinksStats',
  async ({ id, period }: getStatsProps) => {
    const { data } = await axios.get(`/api/stats/link/${id}?period=${period}`);
    return data;
  },
);
