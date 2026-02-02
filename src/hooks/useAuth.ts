import { useEffect, useState } from "react";
import { refreshAccessToken } from "@/apis/auth";
import { storage } from "@/apis/storage";

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = storage.getToken();
      if (accessToken) {
        setAuthState({ isLoading: false, isAuthenticated: true });
        return;
      }
      try {
        const newToken = await refreshAccessToken();
        storage.setToken(newToken);
        setAuthState({ isLoading: false, isAuthenticated: true });
      } catch {
        setAuthState({ isLoading: false, isAuthenticated: false });
      }
    };

    checkAuth();
  }, []);

  return authState;
};
