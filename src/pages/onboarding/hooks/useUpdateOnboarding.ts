import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateOnboarding } from "@/apis/onboarding/onboarding";
import { storage } from "@/apis/storage";
import { useApiError } from "@/hooks/api/useApiError";
import { useAuthStore } from "@/store/auth";
import type { OnboardingRequest } from "@/types/onboarding/onboarding";

export const useUpdateOnboarding = () => {
  const navigate = useNavigate();
  const { handleError } = useApiError();
  const setOnboardingCompleted = useAuthStore(
    (state) => state.setOnboardingCompleted,
  );

  return useMutation({
    mutationFn: (payload: OnboardingRequest) => updateOnboarding(payload),
    onSuccess: () => {
      storage.setOnboardingCompleted(true);
      setOnboardingCompleted(true);
      navigate("/onboarding/recommend");
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
