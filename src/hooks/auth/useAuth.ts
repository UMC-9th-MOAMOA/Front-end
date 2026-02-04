import { useEffect } from "react";
import { refreshAccessToken } from "@/apis/auth";
import { storage } from "@/apis/storage";
import { useAuthStore } from "@/store/auth";

export const useAuth = () => {
  const { isLoading, isAuthenticated, setAuthenticated, setLoading } =
    useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = storage.getToken();
      if (accessToken) {
        setAuthenticated(true);
        setLoading(false);
        return;
      }
      try {
        const newToken = await refreshAccessToken();
        storage.setToken(newToken);
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setAuthenticated, setLoading]);

  return { isLoading, isAuthenticated };
};
