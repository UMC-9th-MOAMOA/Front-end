import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setPolicyAgreed = useAuthStore((state) => state.setPolicyAgreed);
  const setOnboardingCompleted = useAuthStore(
    (state) => state.setOnboardingCompleted,
  );

  return useMutation({
    mutationFn: (payload: SocialLoginTokenRequest) =>
      exchangeSocialToken(payload),
    onSuccess: (result) => {
      queryClient.removeQueries({ queryKey: ["home"] });
      queryClient.removeQueries({ queryKey: ["members", "me", "profile"] });
      storage.setToken(result.token.accessToken);
      storage.setPolicyAgreed(result.policyAgreed);
      storage.setOnboardingCompleted(result.onboardingCompleted);
      setAuthenticated(true);
      setPolicyAgreed(result.policyAgreed);
      setOnboardingCompleted(result.onboardingCompleted);

      if (!result.policyAgreed) {
        return;
      }
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
