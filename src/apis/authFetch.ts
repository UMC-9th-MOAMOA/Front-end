import type { ApiError } from "./http";
import { request } from "./http";
import { clearStoredAuth, getStoredAuth } from "./authStorage";
import { refreshTokens } from "./refresh";

// 인증이 필요한 요청
export function authFetch<T>(input: string, init: RequestInit = {}) {
  const run = async () => {
    const { accessToken, grantType } = getStoredAuth();
    const authHeader = accessToken ? `${grantType} ${accessToken}` : "";

    try {
      return await request<T>(input, {
        ...init,
        headers: {
          ...(init.headers ?? {}),
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
      });
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status !== 401) throw error;

      try {
        const refreshed = await refreshTokens();
        const refreshedAuthHeader = `${refreshed.grantType} ${refreshed.accessToken}`;

        return await request<T>(input, {
          ...init,
          headers: {
            ...(init.headers ?? {}),
            Authorization: refreshedAuthHeader,
          },
        });
      } catch (refreshError) {
        clearStoredAuth();
        throw refreshError;
      }
    }
  };

  return run();
}

