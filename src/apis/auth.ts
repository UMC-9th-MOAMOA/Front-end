import axios from "axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type {
  SendVerificationEmailResult,
  VerifyEmailAuthCodeResult,
} from "@/types/auth/email";
import { publicAPI } from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  grantType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
}

const toApiErrorFromAxios = (error: unknown): ApiError | null => {
  if (!axios.isAxiosError<ApiResponse<unknown>>(error)) return null;

  const data = error.response?.data;
  if (!data || typeof data !== "object") return null;

  const apiError = new Error(data.message) as ApiError;
  apiError.serverCode = data.code;
  apiError.serverMessage = data.message;
  apiError.serverResult = data.result;
  return apiError;
};

export const login = async (payload: LoginRequest) => {
  try {
    const { data } = await publicAPI.post<ApiResponse<LoginResult>>(
      "/auth/login",
      payload
    );

    if (!data.isSuccess) {
      throw new Error(data.message);
    }

    return data.result;
  } catch (error) {
    const apiError = toApiErrorFromAxios(error);
    if (apiError) throw apiError;
    throw error;
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  const { data } = await axios.post<ApiResponse<{ accessToken: string }>>(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    undefined,
    { withCredentials: true }
  );

  if (!data.isSuccess || !data.result?.accessToken) {
    throw new Error(data.message || "리프레시 실패");
  }

  return data.result.accessToken;
};

export const refreshToken = refreshAccessToken;

export interface SendVerificationEmailRequest {
  email: string;
}

export const sendVerificationEmail = async (
  payload: SendVerificationEmailRequest
) => {
  try {
    const { data } = await publicAPI.post<
      ApiResponse<SendVerificationEmailResult>
    >("/auth/email/send-code", payload);

    if (!data.isSuccess) {
      const apiError = new Error(data.message) as ApiError;
      apiError.serverCode = data.code;
      apiError.serverMessage = data.message;
      apiError.serverResult = data.result;
      throw apiError;
    }

    return data.result;
  } catch (error) {
    const apiError = toApiErrorFromAxios(error);
    if (apiError) throw apiError;
    throw error;
  }
};

export interface VerifyEmailAuthCodeRequest {
  email: string;
  authCode: string;
}

export const verifyEmailAuthCode = async (
  payload: VerifyEmailAuthCodeRequest
) => {
  try {
    const { data } = await publicAPI.post<
      ApiResponse<VerifyEmailAuthCodeResult>
    >("/auth/email/verify", payload);

    if (!data.isSuccess) {
      const apiError = new Error(data.message) as ApiError;
      apiError.serverCode = data.code;
      apiError.serverMessage = data.message;
      apiError.serverResult = data.result;
      throw apiError;
    }

    return data.result;
  } catch (error) {
    const apiError = toApiErrorFromAxios(error);
    if (apiError) throw apiError;
    throw error;
  }
};
