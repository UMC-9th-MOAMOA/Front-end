import { useMutation } from "@tanstack/react-query";
import {
  type SendVerificationEmailRequest,
  sendVerificationEmail,
} from "@/apis/auth";
import { useApiError } from "@/hooks/api/useApiError";

export const useSendVerificationEmail = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: SendVerificationEmailRequest) =>
      sendVerificationEmail(payload),
    onError: (error) => handleError(error),
  });
};
