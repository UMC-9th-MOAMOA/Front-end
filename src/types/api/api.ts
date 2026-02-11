export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  error?: null;
}

export interface ApiError extends Error {
  serverCode: string;
  serverMessage: string;
  serverResult?: unknown;
}
