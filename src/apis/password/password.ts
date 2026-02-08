import axios from "axios";
import { authAPI, publicAPI } from "@/apis/axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type {
  ChangePasswordRequest,
  ChangePasswordResult,
  PasswordResetEmailResult,
  PasswordResetVerificationResult,
} from "@/types/password/password";

const CHANGE_PASSWORD_ENDPOINT = "/members/me/password";
const PASSWORD_RESET_EMAIL_ENDPOINT = "/auth/password-resets";
const PASSWORD_RESET_VERIFY_ENDPOINT = "/auth/password-resets/verifications";

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

export interface PasswordResetEmailRequest {
  email: string;
}

export const sendPasswordResetEmail = async (
  payload: PasswordResetEmailRequest
) => {
  try {
    const { data } = await publicAPI.post<
      ApiResponse<PasswordResetEmailResult>
    >(PASSWORD_RESET_EMAIL_ENDPOINT, payload);

    if (!data.isSuccess) throw toApiError(data.code, data.message);
    return data.result;
  } catch (error) {
    if (axios.isAxiosError<ApiResponse<PasswordResetEmailResult>>(error)) {
      const data = error.response?.data;
      if (data?.code && data?.message) {
        throw toApiError(data.code, data.message);
      }
    }
    throw error;
  }
};

export interface PasswordResetVerificationRequest {
  email: string;
  authCode: string;
}

export const verifyPasswordResetCode = async (
  payload: PasswordResetVerificationRequest
) => {
  try {
    const { data } = await publicAPI.post<
      ApiResponse<PasswordResetVerificationResult>
    >(PASSWORD_RESET_VERIFY_ENDPOINT, payload);

    if (!data.isSuccess) throw toApiError(data.code, data.message);
    return data.result;
  } catch (error) {
    if (
      axios.isAxiosError<ApiResponse<PasswordResetVerificationResult>>(error)
    ) {
      const data = error.response?.data;
      if (data?.code && data?.message) {
        throw toApiError(data.code, data.message);
      }
    }
    throw error;
  }
};
