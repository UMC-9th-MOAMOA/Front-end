import { useMutation } from "@tanstack/react-query";
import {
  type SendVerificationEmailRequest,
  sendVerificationEmail,
} from "@/apis/auth";
import { ERROR_CODES } from "@/constants/errorCodes";
import { useApiError } from "@/hooks/api/useApiError";
import type { ApiError } from "@/types/api/api";

type SendVerificationEmailErrorState = {
  text: string;
  tone: "error";
};

export const getSendVerificationEmailErrorState = (
  error: unknown
): SendVerificationEmailErrorState | null => {
  const apiError = error as ApiError;
  const code = apiError?.serverCode;
  const emailError =
    typeof apiError?.serverResult === "object" &&
    apiError?.serverResult !== null &&
    "email" in apiError.serverResult
      ? (apiError.serverResult as { email?: string }).email
      : undefined;

  if (code === ERROR_CODES.GENERAL.BODY_VALIDATION) {
    return {
      text: emailError || "이메일을 확인해주세요",
      tone: "error",
    };
  }

  if (code === ERROR_CODES.AUTH.RESEND_DELAY) {
    return {
      text: "이메일 재전송은 30초 뒤에 가능합니다.",
      tone: "error",
    };
  }

  if (code === ERROR_CODES.MEMBER.DUPLICATE_EMAIL) {
    return {
      text: "이미 사용 중인 이메일입니다.",
      tone: "error",
    };
  }

  if (code === ERROR_CODES.AUTH.RATE_LIMITED) {
    return {
      text: "비정상적인 요청 감지로 1시간 동안 인증이 제한됩니다.",
      tone: "error",
    };
  }

  if (
    code === ERROR_CODES.AUTH.EMAIL_SEND_FAILED ||
    code === ERROR_CODES.GENERAL.INTERNAL_SERVER_ERROR
  ) {
    return {
      text: "이메일 전송 중 오류가 발생했습니다.",
      tone: "error",
    };
  }

  return null;
};

export const useSendVerificationEmail = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: SendVerificationEmailRequest) =>
      sendVerificationEmail(payload),
    onError: (error) => handleError(error),
  });
};
