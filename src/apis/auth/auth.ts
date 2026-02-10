import axios from "axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type { LoginRequest, LoginResult } from "@/types/auth/login";
import type { RecoverResult } from "@/types/auth/recover";
import type {
  SocialLoginResult,
  SocialLoginTokenRequest,
} from "@/types/auth/social";
import { publicAPI } from "../axios";

export const login = async (payload: LoginRequest) => {
  try {
    const { data } = await publicAPI.post<ApiResponse<LoginResult>>(
      "/auth/login",
      payload
    );

    if (!data.isSuccess) {
      const apiError = new Error(data.message) as ApiError;
      apiError.serverCode = data.code;
      apiError.serverMessage = data.message;
      throw apiError;
    }

    return data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as ApiResponse<null> | undefined;
      if (data) {
        const apiError = new Error(data.message) as ApiError;
        apiError.serverCode = data.code;
        apiError.serverMessage = data.message;
        throw apiError;
      }
    }

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

export const recoverAccount = async (payload: LoginRequest) => {
  try {
    const { data } = await publicAPI.post<ApiResponse<RecoverResult>>(
      "/auth/recover",
      payload
    );

    if (!data.isSuccess) {
      const apiError = new Error(data.message) as ApiError;
      apiError.serverCode = data.code;
      apiError.serverMessage = data.message;
      throw apiError;
    }

    return data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as ApiResponse<null> | undefined;
      if (data) {
        const apiError = new Error(data.message) as ApiError;
        apiError.serverCode = data.code;
        apiError.serverMessage = data.message;
        throw apiError;
      }
    }

    throw error;
  }
};

export const exchangeSocialToken = async (
  payload: SocialLoginTokenRequest
) => {
  try {
    const { data } = await publicAPI.post<ApiResponse<SocialLoginResult>>(
      "/auth/oauth2/token",
      payload
    );

    if (!data.isSuccess) {
      const apiError = new Error(data.message) as ApiError;
      apiError.serverCode = data.code;
      apiError.serverMessage = data.message;
      throw apiError;
    }

    return data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as ApiResponse<null> | undefined;
      if (data) {
        const apiError = new Error(data.message) as ApiError;
        apiError.serverCode = data.code;
        apiError.serverMessage = data.message;
        throw apiError;
      }
    }

    throw error;
  }
};
