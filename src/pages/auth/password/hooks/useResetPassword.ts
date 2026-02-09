import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/apis/password/password";
import { useApiError } from "@/hooks/api/useApiError";
import type { PasswordResetRequest } from "@/types/password/password";

export const useResetPassword = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: PasswordResetRequest) => resetPassword(payload),
    onError: (error) => handleError(error),
  });
};
