import { useMutation } from "@tanstack/react-query";
import {
  type VerifyEmailAuthCodeRequest,
  verifyEmailAuthCode,
} from "@/apis/auth";
import { ERROR_CODES } from "@/constants/errorCodes";
import { useApiError } from "@/hooks/api/useApiError";
import type { ApiError } from "@/types/api/api";

type VerifyEmailAuthCodeErrorState = {
  text: string;
  tone: "error";
};

export const getVerifyEmailAuthCodeErrorState = (
  error: unknown
): VerifyEmailAuthCodeErrorState | null => {
  const apiError = error as ApiError;
  const code = apiError?.serverCode;

  if (code === ERROR_CODES.GENERAL.BODY_VALIDATION) {
    return {
      text: "인증번호를 확인해주세요.",
      tone: "error",
    };
  }

  if (code === ERROR_CODES.AUTH.INVALID_VERIFY_CODE) {
    return {
      text: "인증번호가 올바르지 않아요",
      tone: "error",
    };
  }

  if (code === ERROR_CODES.AUTH.TIMEOUT) {
    return {
      text: "인증번호가 만료되었습니다.",
      tone: "error",
    };
  }

  if (code === ERROR_CODES.AUTH.TOO_MANY_ATTEMPTS) {
    return {
      text: "인증번호 확인 시도가 너무 많아요. 잠시 후 다시 시도해주세요.",
      tone: "error",
    };
  }

  if (code === ERROR_CODES.GENERAL.INTERNAL_SERVER_ERROR) {
    return {
      text: "인증번호 확인 중 오류가 발생했습니다.",
      tone: "error",
    };
  }

  return null;
};

type VerifyEmailAuthCodeHandlers = {
  onSuccess?: () => void;
  onErrorState?: (state: VerifyEmailAuthCodeErrorState) => void;
  onUnknownError?: (message: string) => void;
};

export const useVerifyEmailAuthCode = (
  handlers?: VerifyEmailAuthCodeHandlers
) => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: VerifyEmailAuthCodeRequest) =>
      verifyEmailAuthCode(payload),
    onSuccess: () => {
      handlers?.onSuccess?.();
    },
    onError: (error) => {
      const errorState = getVerifyEmailAuthCodeErrorState(error);
      if (errorState) {
        handlers?.onErrorState?.(errorState);
        return;
      }

      handleError(error);
      const serverMessage = (error as { serverMessage?: string })
        ?.serverMessage;
      handlers?.onUnknownError?.(
        serverMessage || "인증번호 확인에 실패했어요"
      );
    },
  });
};
