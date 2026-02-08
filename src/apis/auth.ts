import axios from "axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type { SendVerificationEmailResult } from "@/types/auth/email";
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

export const login = async (payload: LoginRequest) => {
  const { data } = await publicAPI.post<ApiResponse<LoginResult>>(
    "/auth/login",
    payload
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
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
};
