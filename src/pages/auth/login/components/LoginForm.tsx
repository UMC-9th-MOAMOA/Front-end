import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, recoverAccount } from "@/apis/auth";
import { setStoredAuth } from "@/apis/authStorage";
import CheckBoxOnIcon from "@/assets/icons/auth/ic_checked.svg?react";
import CheckBoxOffIcon from "@/assets/icons/auth/ic_unchecked.svg?react";
import DividerIcon from "@/assets/icons/ic_divider.svg?react";
import { useAuth } from "@/auth/AuthProvider";
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
  const navigate = useNavigate();
  const { syncAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const [blockedCode, setBlockedCode] = useState<
    "" | "AUTH403_2" | "AUTH403_3"
  >("");
  const [isRecoverSuccessModalOpen, setIsRecoverSuccessModalOpen] =
    useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoverError, setRecoverError] = useState<string | null>(null);
  const isFormValid = email.trim().length > 0 && password.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    if (!isEmailValid) {
      setEmailError("이메일 형식을 확인해 주세요.");
      return;
    }

    setIsLoading(true);
    setSubmitError(null);
    setEmailError(null);

    try {
      const response = await login(email.trim(), password.trim());
      const { accessToken, grantType } = response.result;
      setStoredAuth(accessToken, grantType, { autoLogin });
      syncAuth();
      navigate("/", { replace: true });
    } catch (error) {
      const isErrorObject = typeof error === "object" && error !== null;
      const code =
        isErrorObject &&
        "code" in error &&
        typeof (error as { code?: string }).code === "string"
          ? (error as { code: string }).code
          : "";

      if (code === "AUTH403_2" || code === "AUTH403_3") {
        setBlockedCode(code as "AUTH403_2" | "AUTH403_3");
        setIsBlockedModalOpen(true);
        setRecoverError(null);
        setSubmitError(null);
      } else {
        if (code === "AUTH401_1") {
          setSubmitError("이메일 또는 비밀번호가 일치하지 않습니다.");
        } else if (code === "COMMON500_1") {
          setSubmitError("서버 에러가 발생했습니다. 다시 시도해주세요");
        } else {
          setSubmitError("로그인에 실패했습니다.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecover = async () => {
    if (isRecovering) return;
    if (!email.trim() || !password.trim()) {
      setRecoverError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsRecovering(true);
    setRecoverError(null);

    try {
      const response = await recoverAccount(email.trim(), password.trim());
      if (!response.isSuccess || !response.result) {
        setRecoverError("계정 복구에 실패했습니다.");
        return;
      }
      const { accessToken, grantType } = response.result;
      setStoredAuth(accessToken, grantType, { autoLogin });
      syncAuth();
      setIsBlockedModalOpen(false);
      setIsRecoverSuccessModalOpen(true);
    } catch (error) {
      const isErrorObject = typeof error === "object" && error !== null;
      const code =
        isErrorObject &&
        "code" in error &&
        typeof (error as { code?: string }).code === "string"
          ? (error as { code: string }).code
          : "";

      if (code === "COMMON500_1") {
        setRecoverError("서버 에러가 발생했습니다. 다시 시도해주세요");
      } else {
        setRecoverError("계정 복구에 실패했습니다.");
      }
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <form className="flex flex-col gap-20" onSubmit={handleSubmit} noValidate>
      <AuthTextField
        name="email"
        placeholder="이메일 주소를 입력해주세요"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError(null);
        }}
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
        <span className="body-4 text-gray-900">자동 로그인</span>
      </label>
      <Button
        type="submit"
        className="heading-5 mt-23 mb-4 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-800"
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
      {submitError && (
        <p className="body-5 -mt-8 text-center text-red-500">{submitError}</p>
      )}
      {emailError && (
        <p className="body-5 -mt-8 text-center text-red-500">{emailError}</p>
      )}
      <AuthLinksRow />
      <Modal
        open={isBlockedModalOpen}
        onClose={() => {
          setIsBlockedModalOpen(false);
          setRecoverError(null);
          setIsRecovering(false);
        }}
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
              {recoverError && (
                <p className="body-5 mt-12 text-center text-red-500">
                  {recoverError}
                </p>
              )}
              <div className="mt-32 flex w-full gap-12">
                <Button
                  type="button"
                  className="body-2 h-50 w-full rounded-lg bg-moamoa-50 text-moamoa-600 active:bg-moamoa-100"
                  onClick={() => {
                    setIsBlockedModalOpen(false);
                    setRecoverError(null);
                    setIsRecovering(false);
                  }}
                  disabled={isRecovering}
                >
                  닫기
                </Button>
                <Button
                  type="button"
                  className="body-2 h-50 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
                  onClick={handleRecover}
                  disabled={isRecovering}
                >
                  {isRecovering ? "복구 중..." : "복구하기"}
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
      <Modal
        open={isRecoverSuccessModalOpen}
        onClose={() => setIsRecoverSuccessModalOpen(false)}
      >
        <div className="flex flex-col items-center text-center">
          <p className="heading-3 text-moamoa-400">계정이 복구 되었습니다</p>
          <p className="body-2 mt-20 text-gray-600">반가워요 !</p>
          <Button
            type="button"
            className="body-2 mt-32 h-50 w-154 rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
            onClick={() => {
              setIsRecoverSuccessModalOpen(false);
              navigate("/", { replace: true });
            }}
          >
            확인
          </Button>
        </div>
      </Modal>
    </form>
  );
}
