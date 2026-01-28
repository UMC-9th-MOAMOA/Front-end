import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { storage } from "./storage";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// 리프레시 요청은 직접 axios로 발신 → interceptor 우회, 무한루프 방지
const refreshAccessToken = async (): Promise<string> => {
  const { data } = await axios.post<{ accessToken: string }>(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    undefined,
    { withCredentials: true }
  );
  storage.setToken(data.accessToken);
  return data.accessToken;
};

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const originalConfig = error.config as RetryableConfig;

    if (error.response?.status !== 401 || originalConfig._retry) {
      throw error;
    }

    originalConfig._retry = true;

    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken();
      }

      const newToken = await refreshPromise;
      originalConfig.headers.Authorization = `Bearer ${newToken}`;

      return instance(originalConfig);
    } catch {
      storage.removeToken();
      window.location.href = "/login";
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  });
};
