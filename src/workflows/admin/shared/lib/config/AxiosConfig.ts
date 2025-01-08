import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_LINK,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
