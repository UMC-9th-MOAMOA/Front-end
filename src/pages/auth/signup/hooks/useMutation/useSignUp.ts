import { useMutation } from "@tanstack/react-query";
import { signUp, type SignupRequest } from "@/apis/auth";
import { useApiError } from "@/hooks/api/useApiError";

export const useSignUp = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: SignupRequest) => signUp(payload),
    onError: (error) => handleError(error),
  });
};
