import type { ApiError } from "./http";
import { request } from "./http";
import { setStoredAuth } from "./authStorage";

type RefreshResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
  } | null;
};

export type RefreshedAuth = {
  accessToken: string;
  grantType: string;
};

let refreshPromise: Promise<RefreshResponse> | null = null;

export async function refreshTokens(): Promise<RefreshedAuth> {
  if (!refreshPromise) {
    refreshPromise = request<RefreshResponse>("/api/v1/auth/refresh", {
      method: "POST",
    }).finally(() => {
      refreshPromise = null;
    });
  }

  const response = await refreshPromise;
  if (!response.isSuccess || !response.result) {
    throw {
      message: response.message || "토큰 재발급에 실패했습니다.",
      code: response.code,
      status: 401,
    } satisfies ApiError;
  }

  const { accessToken, grantType } = response.result;
  setStoredAuth(accessToken, grantType);
  return { accessToken, grantType };
}

