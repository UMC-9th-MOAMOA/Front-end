import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/apis/auth";
import { storage } from "@/apis/storage";
import CheckBoxOnIcon from "@/assets/icons/auth/ic_checked.svg?react";
import CheckBoxOffIcon from "@/assets/icons/auth/ic_unchecked.svg?react";
import DividerIcon from "@/assets/icons/ic_divider.svg?react";
import { Button } from "@/components/common/button/Button";
import { AuthTextField } from "../../components/AuthTextField";
import { Modal } from "../../components/Modal";
import { PasswordTextField } from "../../components/PasswordTextField";

function AuthLinksRow() {
  return (
    <div className="flex items-center justify-center gap-24 text-gray-600 text-sm">
      <Link to="/reset-password" className="hover:underline">
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
  const [autoLogin, setAutoLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [blockedCode, setBlockedCode] = useState<
    "AUTH403_2" | "AUTH403_3" | ""
  >("");
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const canSubmit =
    email.trim().length > 0 && password.trim().length > 0 && !isSubmitting;

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
    if (isSubmitting) return;

    setErrorMessage("");
    setIsSubmitting(true);
    setBlockedCode("");
    setIsBlockedModalOpen(false);

    try {
      const result = await login({ email, password });
      storage.setToken(result.accessToken);

      if (autoLogin) {
        // TODO: 자동 로그인 기능 구현
      }

      navigate("/onboarding");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as {
          code?: string;
          message?: string;
        };
        if (data?.code === "AUTH403_2" || data?.code === "AUTH403_3") {
          setBlockedCode(data.code);
          setIsBlockedModalOpen(true);
          setErrorMessage("");
        } else {
          const message = resolveLoginErrorMessage(data?.code, data?.message);
          setErrorMessage(message);
        }
      } else {
        const message =
          error instanceof Error ? error.message : "로그인에 실패했습니다.";
        setErrorMessage(message);
      }
    } finally {
      setIsSubmitting(false);
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
        <label className="inline-flex w-fit items-center gap-8">
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}
            className="sr-only"
          />
          <span className="h-16 w-16">
            {autoLogin ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
          </span>
          <span className="body-4 mb-10 text-gray-900">자동 로그인</span>
        </label>
      </div>
      <div className="min-h-10 text-center">
        {errorMessage ? (
          <p className="body-4 text-red-500">{errorMessage}</p>
        ) : null}
      </div>
      <Button
        type="submit"
        className="heading-5 mt-23 mb-4 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-800"
        disabled={!canSubmit}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
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
