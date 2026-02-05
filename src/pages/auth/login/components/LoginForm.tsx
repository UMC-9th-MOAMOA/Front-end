import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "@/apis/storage";
import DividerIcon from "@/assets/icons/ic_divider.svg?react";
import { Button } from "@/components/common/button/Button";
import { useAuthStore } from "@/store/auth";
import type { ApiError } from "@/types/api/api";
import { AuthTextField } from "../../components/AuthTextField";
import { Modal } from "../../components/Modal";
import { PasswordTextField } from "../../components/PasswordTextField";
import { useLogin } from "../hooks/useMutation/useLogin";

function AuthLinksRow() {
  return (
    <div className="flex items-center justify-center gap-16 text-gray-600 text-sm">
      <Link to="/password" className="hover:underline">
        비밀번호 찾기
      </Link>
      <DividerIcon className="h-18 w-1" aria-hidden="true" />
      <Link to="/signup" className="text-black">
        회원가입
      </Link>
    </div>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [blockedCode, setBlockedCode] = useState<
    "AUTH403_2" | "AUTH403_3" | ""
  >("");
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const { mutateAsync: loginMutate, isPending } = useLogin();

  const canSubmit =
    email.trim().length > 0 && password.trim().length > 0 && !isPending;

  const resolveLoginErrorMessage = (code?: string, fallback?: string) => {
    switch (code) {
      case "VALIDATION400_2":
      case "AUTH401_1":
        return "이메일 또는 비밀번호가 일치하지 않습니다.";
      case "COMMON500_1":
        return "서버 에러가 발생했습니다. 다시 시도해주세요.";
      default:
        return fallback ?? "로그인에 실패했습니다.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    setErrorMessage("");
    setBlockedCode("");
    setIsBlockedModalOpen(false);

    try {
      const result = await loginMutate({ email, password });
      storage.setToken(result.token.accessToken);
      setAuthenticated(true);

      navigate(result.onboardingCompleted ? "/" : "/onboarding");
    } catch (error) {
      const apiError = error as ApiError;
      const code = apiError?.serverCode;
      const message =
        apiError?.serverMessage ||
        (error instanceof Error ? error.message : undefined);
      if (code === "AUTH403_2" || code === "AUTH403_3") {
        setBlockedCode(code);
        setIsBlockedModalOpen(true);
        setErrorMessage("");
      } else {
        const resolved = resolveLoginErrorMessage(
          code,
          message ?? "로그인에 실패했습니다."
        );
        setErrorMessage(resolved);
      }
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-20">
        <AuthTextField
          name="email"
          placeholder="이메일 주소를 입력해주세요"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          width="full"
          variant="outlined"
        />
        <PasswordTextField
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width="full"
          variant="outlined"
        />
      </div>
      <div className="text-center">
        {errorMessage ? (
          <p className="body-4 text-red-500">{errorMessage}</p>
        ) : null}
      </div>
      <Button
        type="submit"
        className="heading-5 mt-58 mb-26 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-800"
        disabled={!canSubmit}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
      <AuthLinksRow />
      <Modal
        open={isBlockedModalOpen}
        onClose={() => setIsBlockedModalOpen(false)}
      >
        <div className="flex flex-col items-center text-center">
          {blockedCode === "AUTH403_2" ? (
            <>
              <p className="heading-3 text-moamoa-400">
                복구 가능한 계정이 존재해요
              </p>
              <p className="body-2 mt-20 text-gray-600">
                기존 계정을 복구 하시겠어요?
              </p>
              <div className="mt-32 flex w-full gap-12">
                <Button
                  type="button"
                  className="body-2 h-50 w-full rounded-lg bg-moamoa-50 text-moamoa-600 active:bg-moamoa-100"
                  onClick={() => setIsBlockedModalOpen(false)}
                >
                  닫기
                </Button>
                <Button
                  type="button"
                  className="body-2 h-50 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
                  onClick={() => setIsBlockedModalOpen(false)}
                >
                  복구하기
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="heading-3 text-black">
                서비스 이용이
                <br />
                정지된 계정입니다.
              </p>
              <Button
                type="button"
                className="body-2 h-50 w-154 rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
                onClick={() => setIsBlockedModalOpen(false)}
              >
                확인
              </Button>
            </>
          )}
        </div>
      </Modal>
    </form>
  );
}
