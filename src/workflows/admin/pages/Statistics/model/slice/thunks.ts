import axios from '../../../../shared/lib/config/AxiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStatsProps, StatsData } from '../types/statisticsSchema';

export const addSiteVisit = createAsyncThunk('statistics/addSiteVisit', async () => {
  const { data } = await axios.post(`/api/stats/visit`);
  return data;
});

export const addLinkClick = createAsyncThunk(
  'statistics/addLinkClick',
  async ({ id }: Omit<getStatsProps, 'period'>) => {
    const { data } = await axios.post(`/api/stats/link/${id}/click`);
    return data;
  },
);

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

export const getLinkStatsCount = createAsyncThunk(
  'statistics/getLinkStatsCount',
  async ({ id, period }: getStatsProps) => {
    const { data }: { data: StatsData } = await axios.get(`/api/stats/link/${id}?period=${period}`);
    const count = data.dataPoints.reduce(
      (acc, currentValue) => Number(acc) + Number(currentValue),
      0,
    );

    return count;
  },
);
