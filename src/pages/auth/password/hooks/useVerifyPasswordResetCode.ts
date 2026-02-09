import { useMutation } from "@tanstack/react-query";
import {
  verifyPasswordResetCode,
  type PasswordResetVerificationRequest,
} from "@/apis/password/password";
import { useApiError } from "@/hooks/api/useApiError";

export const useVerifyPasswordResetCode = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: PasswordResetVerificationRequest) =>
      verifyPasswordResetCode(payload),
    onError: (error) => handleError(error),
  });
};
