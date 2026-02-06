import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateOnboarding } from "@/apis/onboarding/onboarding";
import { useApiError } from "@/hooks/api/useApiError";
import type { OnboardingRequest } from "@/types/onboarding/onboarding";

export const useUpdateOnboarding = () => {
  const navigate = useNavigate();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: OnboardingRequest) => updateOnboarding(payload),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
