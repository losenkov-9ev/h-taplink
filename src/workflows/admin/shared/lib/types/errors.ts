import { PayloadAction } from '@reduxjs/toolkit';

export interface ApiError {
  ok: false;
  error: {
    code: string;
    description: string;
  };
}

export type ErrorPayload = PayloadAction<
  { status: number; message: string | undefined } | undefined
>;
