import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "@/apis/auth/auth";
import { storage } from "@/apis/storage";
import { useApiError } from "@/hooks/api/useApiError";
import { useAuthStore } from "@/store/auth";
import type { ApiError } from "@/types/api/api";
import type { LoginRequest } from "@/types/auth/login";

type BlockedCode = "AUTH403_2" | "AUTH403_3";
type LoginErrorHandlers = {
  onBlocked?: (code: BlockedCode) => void;
  onMessage?: (message: string) => void;
};

const resolveLoginErrorMessage = (code?: string, fallback?: string) => {
  switch (code) {
    case "VALIDATION400_2":
    case "AUTH401_1":
      return "이메일 또는 비밀번호가 일치하지 않습니다.";
    case "COMMON500_1":
      return "서버 에러가 발생했습니다. 다시 시도해주세요.";
    default:
      return fallback ?? "로그인에 실패했습니다.";
  }
};

export const useLogin = (handlers?: LoginErrorHandlers) => {
  const { handleError } = useApiError();
  const navigate = useNavigate();
  const location = useLocation();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setPolicyAgreed = useAuthStore((state) => state.setPolicyAgreed);

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
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
      navigate(result.onboardingCompleted ? "/" : "/onboarding");
    },
    onError: (error) => {
      const apiError = error as ApiError;
      const code = apiError?.serverCode as BlockedCode | undefined;
      const message =
        apiError?.serverMessage ||
        (error instanceof Error ? error.message : undefined);

      if (code === "AUTH403_2" || code === "AUTH403_3") {
        handlers?.onBlocked?.(code);
        return;
      }

      handleError(error);
      handlers?.onMessage?.(resolveLoginErrorMessage(code, message));
    },
  });
};
