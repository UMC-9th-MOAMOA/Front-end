export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface ApiError extends Error {
  serverCode: string;
  serverMessage: string;
}
