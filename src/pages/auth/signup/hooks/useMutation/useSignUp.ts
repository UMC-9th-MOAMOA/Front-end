import { useMutation } from "@tanstack/react-query";
import { type SignupRequest, signUp } from "@/apis/auth";
import { useApiError } from "@/hooks/api/useApiError";
import type { SignupResult } from "@/types/auth/signup";

type SignUpHandlers = {
  onSuccess?: (result: SignupResult) => void;
  onErrorMessage?: (message: string) => void;
};

export const useSignUp = (handlers?: SignUpHandlers) => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: SignupRequest) => signUp(payload),
    onSuccess: (result) => {
      handlers?.onSuccess?.(result);
    },
    onError: (error) => {
      handleError(error);
      const serverMessage = (error as { serverMessage?: string })
        ?.serverMessage;
      handlers?.onErrorMessage?.(serverMessage || "회원가입에 실패했어요");
    },
  });
};
