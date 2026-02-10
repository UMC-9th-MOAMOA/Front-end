import { useEffect } from "react";
import { refreshAccessToken } from "@/apis/auth/auth";
import { storage } from "@/apis/storage";
import { useAuthStore } from "@/store/auth";

export const useAuth = () => {
  const {
    isLoading,
    isAuthenticated,
    policyAgreed,
    setAuthenticated,
    setLoading,
    setPolicyAgreed,
  } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = storage.getToken();
      if (accessToken) {
        setAuthenticated(true);
        const storedPolicyAgreed = storage.getPolicyAgreed();
        setPolicyAgreed(storedPolicyAgreed ?? true);
        setLoading(false);
        return;
      }
      try {
        const newToken = await refreshAccessToken();
        storage.setToken(newToken);
        setAuthenticated(true);
        const storedPolicyAgreed = storage.getPolicyAgreed();
        setPolicyAgreed(storedPolicyAgreed ?? true);
      } catch {
        storage.removeToken();
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setAuthenticated, setLoading, setPolicyAgreed]);

  return { isLoading, isAuthenticated, policyAgreed };
};
