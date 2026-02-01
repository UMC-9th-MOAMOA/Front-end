import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { PWTextField } from "@/pages/auth/signup/components/PWTextField";
import { AuthTextField } from "../components/AuthTextField";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const passwordConfirmErrorMessage =
    passwordConfirm.length > 0 && password !== passwordConfirm
      ? "비밀번호가 일치하지 않습니다."
      : undefined;

  return (
    <div>
      <AuthHeader
        title="회원가입"
        onBack={() => {
          navigate("/login");
        }}
      />
      <div className="pt-24">
        <AuthTextField
          label="이름"
          placeholder="이름을 입력하세요"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          width="full"
          variant="ghost"
          name="name"
        />
        <PWTextField
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
          passwordConfirm={passwordConfirm}
          onPasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
          passwordConfirmErrorMessage={passwordConfirmErrorMessage}
        />
      </div>
    </div>
  );
}
