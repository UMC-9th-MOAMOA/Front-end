import axios from "axios";
import type { ApiResponse } from "@/types/api/api";
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
  return data.result.accessToken;
};

export const refreshToken = refreshAccessToken;
