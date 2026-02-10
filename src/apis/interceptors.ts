import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/store/auth";
import type { ApiError, ApiResponse } from "@/types/api/api";
import { refreshAccessToken } from "./auth/auth";
import { storage } from "./storage";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const handleRequest = (config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const handleTokenRefresh = async (
  instance: AxiosInstance,
  error: AxiosError
) => {
  const originalConfig = error.config as RetryableConfig;

  if (originalConfig._retry) {
    return Promise.reject(error);
  }

  originalConfig._retry = true;
  try {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken();
    }
    const newToken = await refreshPromise!;
    storage.setToken(newToken);
    originalConfig.headers.Authorization = `Bearer ${newToken}`;
    return instance(originalConfig);
  } catch (refreshError) {
    storage.removeToken();
    useAuthStore.getState().setAuthenticated(false);
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
};

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(handleRequest, (err) =>
    Promise.reject(err)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const errorData = error.response?.data as ApiResponse<null>;

      if (errorData) {
        if (error.response?.status === 401) {
          return handleTokenRefresh(instance, error);
        }

        const apiError = new Error(errorData.message) as ApiError;
        apiError.serverCode = errorData.code;
        apiError.serverMessage = errorData.message;
        apiError.serverResult = errorData.result;
        return Promise.reject(apiError);
      }

      return Promise.reject(error);
    }
  );
};
