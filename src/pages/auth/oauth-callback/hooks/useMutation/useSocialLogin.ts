import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeSocialToken } from "@/apis/auth/auth";
import { storage } from "@/apis/storage";
import { useApiError } from "@/hooks/api/useApiError";
import { useAuthStore } from "@/store/auth";
import type { SocialLoginTokenRequest } from "@/types/auth/social";

type SocialLoginErrorHandlers = {
  onMessage?: (message: string) => void;
};

export const useSocialLogin = (handlers?: SocialLoginErrorHandlers) => {
  const { handleError } = useApiError();
  const navigate = useNavigate();
  const location = useLocation();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setPolicyAgreed = useAuthStore((state) => state.setPolicyAgreed);

  return useMutation({
    mutationFn: (payload: SocialLoginTokenRequest) =>
      exchangeSocialToken(payload),
    onSuccess: (result) => {
      storage.setToken(result.token.accessToken);
      setAuthenticated(true);
      setPolicyAgreed(result.policyAgreed);

      if (!result.policyAgreed) {
        navigate("/terms", {
          replace: true,
          state: {
            from: location.pathname,
            onboardingCompleted: result.onboardingCompleted,
          },
        });
        return;
      }

      navigate(result.onboardingCompleted ? "/home" : "/onboarding", {
        replace: true,
      });
    },
    onError: (error) => {
      handleError(error);
      if (error instanceof Error) {
        handlers?.onMessage?.(error.message);
        return;
      }
      handlers?.onMessage?.("소셜 로그인에 실패했습니다.");
    },
  });
};
