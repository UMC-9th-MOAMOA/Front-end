import axios from "axios";
import { authAPI } from "@/apis/axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type {
  ChangePasswordRequest,
  ChangePasswordResult,
} from "@/types/password/password";

const CHANGE_PASSWORD_ENDPOINT = "/members/me/password";

function toApiError(code: string, message: string): ApiError {
  const e = new Error(message) as ApiError;
  e.serverCode = code;
  e.serverMessage = message;
  return e;
}

export const changePassword = async (payload: ChangePasswordRequest) => {
  try {
    const { data } = await authAPI.patch<ApiResponse<ChangePasswordResult>>(
      CHANGE_PASSWORD_ENDPOINT,
      payload
    );

    if (!data.isSuccess) throw toApiError(data.code, data.message);
    return data.result;
  } catch (error) {
    if (axios.isAxiosError<ApiResponse<ChangePasswordResult>>(error)) {
      const data = error.response?.data;
      if (data?.code && data?.message) {
        throw toApiError(data.code, data.message);
      }
    }
    throw error;
  }
};
