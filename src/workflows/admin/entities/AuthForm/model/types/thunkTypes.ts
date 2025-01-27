import { AxiosError } from 'axios';

export type AuthAPIResponce = { ok: true };
export type AuthAPIError = AxiosError<{
  code: number;
  error: string;
}>;
export interface AuthParams {
  username: string;
  password: string;
}
