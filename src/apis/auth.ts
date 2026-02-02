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

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
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
