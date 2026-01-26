import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "@/apis/auth";
import CheckBoxOnIcon from "@/assets/icons/auth/ic_checked.svg?react";
import CheckBoxOffIcon from "@/assets/icons/auth/ic_unchecked.svg?react";
import { Button } from "@/components/common/button/Button";
import { AuthTextField } from "../../components/AuthTextField";
import { Modal } from "../../components/Modal";
import { PasswordTextField } from "../../components/PasswordTextField";

function AuthLinksRow() {
  return (
    <div className="flex items-center justify-center gap-16 text-gray-600 text-sm">
      <Link to="/find-id" className="hover:underline">
        아이디
      </Link>
      <Link to="/reset-password" className="hover:underline">
        비밀번호 찾기
      </Link>
      <span className="text-gray-900">|</span>
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
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const [blockedCode, setBlockedCode] = useState<
    "" | "AUTH403_2" | "AUTH403_3"
  >("");
  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await login(email.trim(), password.trim());
      const { accessToken, grantType } = response.result;
      const storage = autoLogin ? localStorage : sessionStorage;
      storage.setItem("accessToken", accessToken);
      storage.setItem("grantType", grantType);
      // TODO: 로그인 성공 후 이동 처리 (예: navigate("/"))
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

  return (
    <form className="flex flex-col gap-20" onSubmit={handleSubmit}>
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
        <span className="body-4 text-gray-900">자동 로그인</span>
      </label>
      <Button
        type="submit"
        className="heading-5 mt-12 mb-4 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
      {submitError && (
        <p className="body-5 -mt-8 text-center text-red-500">{submitError}</p>
      )}
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
