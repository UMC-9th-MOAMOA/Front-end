import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthTextField } from "../../components/AuthTextField";

function AuthLinksRow() {
  return (
    <div className="flex items-center justify-center gap-4 text-gray-600 text-sm">
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

  return (
    <form className="flex flex-col gap-4">
      <AuthTextField
        name="email"
        placeholder="이메일 주소를 입력해주세요"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        width="full"
        variant="outlined"
      />
      <AuthTextField
        name="password"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        width="full"
        variant="outlined"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={autoLogin}
          onChange={(e) => setAutoLogin(e.target.checked)}
        />
        <span className="body-4 text-gray-900">자동 로그인</span>
      </label>
      <AuthLinksRow />
    </form>
  );
}
