import type { ApiError } from "@/types/api/api";

export const toApiError = (code: string, message: string): ApiError => {
  const error = new Error(message) as ApiError;
  error.serverCode = code;
  error.serverMessage = message;
  return error;
};
