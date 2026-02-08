import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { recoverAccount } from "@/apis/auth/auth";
import { storage } from "@/apis/storage";
import { useApiError } from "@/hooks/api/useApiError";
import { useAuthStore } from "@/store/auth";
import type { ApiError } from "@/types/api/api";
import type { LoginRequest } from "@/types/auth/login";

type RecoverHandlers = {
  onSuccess?: () => void;
  onMessage?: (message: string) => void;
};

export const useRecoverAccount = (handlers?: RecoverHandlers) => {
  const { handleError } = useApiError();
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  return useMutation({
    mutationFn: (payload: LoginRequest) => recoverAccount(payload),
    onSuccess: (result) => {
      storage.setToken(result.accessToken);
      setAuthenticated(true);
      handlers?.onSuccess?.();
      navigate("/", { replace: true });
    },
    onError: (error) => {
      handleError(error);

      const apiError = error as ApiError;
      const message =
        apiError?.serverMessage ||
        (error instanceof Error ? error.message : undefined);

      handlers?.onMessage?.(message ?? "계정 복구에 실패했습니다.");
    },
  });
};
