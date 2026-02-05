import { useMutation } from "@tanstack/react-query";
import { login } from "@/apis/auth/auth";
import { useApiError } from "@/hooks/api/useApiError";
import type { LoginRequest } from "@/types/auth/login";

export const useLogin = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onError: (error) => handleError(error),
  });
};
