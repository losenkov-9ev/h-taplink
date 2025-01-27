import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor, { AxiosAuthRefreshOptions } from 'axios-auth-refresh';

interface IFailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
  response?: AxiosResponse;
}

function getCookie(name: string) {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_LINK,
  withCredentials: true,
});

const refreshAuthLogic = async (failedRequest: IFailedRequest) => {
  if (failedRequest.config.url?.includes('/auth/refresh')) {
    return Promise.reject(failedRequest);
  }

  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) {
    return Promise.reject(failedRequest);
  }

  try {
    await instance.post('/auth/refresh');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

const options: AxiosAuthRefreshOptions = {
  statusCodes: [401],
};

createAuthRefreshInterceptor(instance, refreshAuthLogic, options);

export default instance;
