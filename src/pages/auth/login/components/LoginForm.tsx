import { useState } from "react";
import { Link } from "react-router-dom";
import CheckBoxOnIcon from "@/assets/icons/auth/ic_checked.svg?react";
import CheckBoxOffIcon from "@/assets/icons/auth/ic_unchecked.svg?react";
import { Button } from "@/components/common/button/Button";
import { AuthTextField } from "../../components/AuthTextField";
import { PasswordTextField } from "./PasswordTextField";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      >
        로그인
      </Button>
      <AuthLinksRow />
    </form>
  );
}
