export type Step = "EMAIL" | "CODE" | "NEW_PASSWORD";
export type Loading = null | "VERIFY";

type ApiError = {
  serverCode?: string;
  response?: {
    data?: {
      code?: string;
    };
  };
};

const rawUseMock = import.meta.env.VITE_USE_MOCK;
export const USE_MOCK =
  !import.meta.env.PROD && (rawUseMock === "true" || rawUseMock === "1");

export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const PASSWORD_RESET_MESSAGES = {
  emailInvalid: "이메일 형식을 확인해주세요.",
  emailSendFailed: "인증 메일 전송에 실패했어요. 잠시 후 다시 시도해주세요.",
  codeRequired: "인증번호를 입력해주세요.",
  codeInvalid: "인증번호가 올바르지 않아요.",
  codeExpired: "인증번호가 만료됐어요. 재발송을 요청해주세요.",
  verifyFailed: "인증에 실패했어요. 잠시 후 다시 시도해주세요.",
  passwordMismatch: "비밀번호가 일치하지 않아요.",
} as const;

export function getServerCode(err: unknown): string | undefined {
  if (typeof err === "object" && err !== null) {
    const apiError = err as ApiError;
    if (apiError.serverCode) return apiError.serverCode;
    if ("response" in apiError) return apiError.response?.data?.code;
  }
  return undefined;
}
