import { AxiosError } from 'axios';
import { ApiError } from '../types/errors';

/**
 * This function handles errors that occur during axios requests.
 * It extracts relevant information from the error response and returns it in a standardized format.
 *
 * @param error - The error object that was thrown during the axios request.
 * @param defaultMessage - A default message to use if the error response does not contain a specific error message.
 *
 * @returns An object containing the status code and error message.
 *          If the error response is present, the status code and error message from the response are used.
 *          If the error response is not present, a default status code of 500 and a network error message are used.
 */

export type RejectType = {
  rejectValue: {
    status: number;
    message: string;
  };
};

export function handleAxiosError(
  error: unknown,
  defaultMessage: string,
): RejectType['rejectValue'] {
  const axiosError = error as AxiosError<ApiError>;

  if (axiosError.response) {
    return {
      status: axiosError.response.status,
      message: axiosError.response.data.error.description || defaultMessage,
    };
  }

  return {
    status: 500,
    message: 'Сетевая ошибка или сервер недоступен',
  };
}
