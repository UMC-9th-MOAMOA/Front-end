import { clearStoredAuth, getStoredAuth } from "./authStorage";
import type { ApiError } from "./http";
import { request } from "./http";
import { refreshTokens } from "./refresh";

const IDEMPOTENT_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

type AuthFetchInit = RequestInit & {
  // 비멱등 메서드의 401 재시도를 명시적으로 허용할 때만 true로 설정
  retryOnAuthFailure?: boolean;
};

function withAuthorization(
  headersInit: HeadersInit | undefined,
  authorization: string
): Headers {
  const headers = new Headers(headersInit);
  if (authorization) {
    headers.set("Authorization", authorization);
  }
  return headers;
}

// 인증이 필요한 요청
export function authFetch<T>(input: string, init: AuthFetchInit = {}) {
  const run = async () => {
    const { retryOnAuthFailure, ...requestInit } = init;
    const { accessToken, grantType } = getStoredAuth();
    const authHeader = accessToken ? `${grantType} ${accessToken}` : "";
    const method = (requestInit.method ?? "GET").toUpperCase();
    const isIdempotentMethod = IDEMPOTENT_METHODS.has(method);
    const shouldRetryOnAuthFailure = retryOnAuthFailure ?? isIdempotentMethod;

    try {
      return await request<T>(input, {
        ...requestInit,
        headers: withAuthorization(requestInit.headers, authHeader),
      });
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status !== 401) throw error;
      if (!shouldRetryOnAuthFailure) throw error;

      try {
        const refreshed = await refreshTokens();
        const refreshedAuthHeader = `${refreshed.grantType} ${refreshed.accessToken}`;

        return await request<T>(input, {
          ...requestInit,
          headers: withAuthorization(requestInit.headers, refreshedAuthHeader),
        });
      } catch (refreshError) {
        clearStoredAuth();
        throw refreshError;
      }
    }
  };

  return run();
}
