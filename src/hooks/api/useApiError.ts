import { useNavigate } from "react-router-dom";
import { storage } from "@/apis/storage";
import { ERROR_CODES } from "@/constants/errorCodes";
import type { ApiError } from "@/types/api/api";

const RELOGIN_CODES: string[] = [
  ERROR_CODES.AUTH.SUSPENDED_ACCOUNT,
  ERROR_CODES.AUTH.INACTIVE_ACCOUNT,
  ERROR_CODES.MEMBER.BANNED,
  ERROR_CODES.MEMBER.WITHDRAWN,
];

type ErrorHandler = (error: ApiError) => void;

export function useApiError(handlers?: Record<string, ErrorHandler>) {
  const navigate = useNavigate();

  const handleError = (error: unknown) => {
    const apiError = error as ApiError;
    const code = apiError.serverCode;

    if (!code) return;
// 화면별 오버라이드가 있으면 우선 실행
    if (handlers?.[code]) {
      handlers[code](apiError);
      return;
    }
// 온보딩 미완료 에러 처리
    if (code === ERROR_CODES.AUTH.ONBOARDING_INCOMPLETE) {
      navigate("/onboarding", { replace: true });
      return;
    }
// 재로그인 필요한 상황 에러 기본 처리
    if (RELOGIN_CODES.includes(code)) {
      storage.removeToken();
      navigate("/login");
    }
  };

  return { handleError };
}
