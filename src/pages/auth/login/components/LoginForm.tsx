import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/apis/auth";
import { storage } from "@/apis/storage";
import CheckBoxOnIcon from "@/assets/icons/auth/ic_checked.svg?react";
import CheckBoxOffIcon from "@/assets/icons/auth/ic_unchecked.svg?react";
import DividerIcon from "@/assets/icons/ic_divider.svg?react";
import { Button } from "@/components/common/button/Button";
import { AuthTextField } from "../../components/AuthTextField";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await login({ email, password });
      storage.setToken(result.accessToken);

      if (autoLogin) {
        // Access token is already persisted; refresh flow is cookie-based.
      }

      navigate("/onboarding");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "로그인에 실패했습니다.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
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
      {errorMessage ? (
        <p className="body-4 text-red-500">{errorMessage}</p>
      ) : null}
      <Button
        type="submit"
        className="heading-5 mt-23 mb-4 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>
      <AuthLinksRow />
    </form>
  );
}
