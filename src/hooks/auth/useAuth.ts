import { useEffect } from "react";
import { refreshAccessToken } from "@/apis/auth/auth";
import { storage } from "@/apis/storage";
import { useAuthStore } from "@/store/auth";

export const useAuth = () => {
  const {
    isLoading,
    isAuthenticated,
    policyAgreed,
    onboardingCompleted,
    setAuthenticated,
    setLoading,
    setPolicyAgreed,
    setOnboardingCompleted,
  } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = storage.getToken();
      if (accessToken) {
        setAuthenticated(true);
        const storedPolicyAgreed = storage.getPolicyAgreed();
        setPolicyAgreed(storedPolicyAgreed ?? true);
        const storedOnboardingCompleted = storage.getOnboardingCompleted();
        setOnboardingCompleted(storedOnboardingCompleted ?? true);
        setLoading(false);
        return;
      }
      try {
        const newToken = await refreshAccessToken();
        storage.setToken(newToken);
        setAuthenticated(true);
        const storedPolicyAgreed = storage.getPolicyAgreed();
        setPolicyAgreed(storedPolicyAgreed ?? true);
        const storedOnboardingCompleted = storage.getOnboardingCompleted();
        setOnboardingCompleted(storedOnboardingCompleted ?? true);
      } catch {
        storage.removeToken();
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setAuthenticated, setLoading, setOnboardingCompleted, setPolicyAgreed]);

  return { isLoading, isAuthenticated, policyAgreed, onboardingCompleted };
};
