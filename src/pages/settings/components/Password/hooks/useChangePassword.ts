import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/apis/password/password";
import { useApiError } from "@/hooks/api/useApiError";
import type { ChangePasswordRequest } from "@/types/password/password";

export const useChangePassword = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: ChangePasswordRequest) => changePassword(payload),
    onError: (error) => handleError(error),
  });
};
