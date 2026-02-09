import { useMutation } from "@tanstack/react-query";
import {
  sendPasswordResetEmail,
  type PasswordResetEmailRequest,
} from "@/apis/password/password";
import { useApiError } from "@/hooks/api/useApiError";

export const useSendPasswordResetEmail = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: PasswordResetEmailRequest) =>
      sendPasswordResetEmail(payload),
    onError: (error) => handleError(error),
  });
};
