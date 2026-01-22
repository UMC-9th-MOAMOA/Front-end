import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { PWTextField } from "@/pages/auth/signup/components/PWTextField";
import { AuthTextField } from "../components/AuthTextField";
import EmailVerifySection from "./components/EmailVerifySection";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [code, setCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [emailStatusText, setEmailStatusText] = useState<string>("");
  const [emailStatusTone, setEmailStatusTone] = useState<
    "success" | "error" | "info"
  >("info");

  const domainOptions = [
    "naver.com",
    "gmail.com",
    "daum.net",
    "kakao.com",
    "hanmail.net",
  ];

  const handleRequestCode = async () => {
    // TODO: API 붙이기
    setEmailStatusText("인증 메일을 보냈어요");
    setEmailStatusTone("info");
  };

  const handleConfirmCode = async () => {
    // TODO: API 붙이기 (성공했을 때만)
    setEmailStatusText("사용 가능한 이메일");
    setEmailStatusTone("success");
    setEmailVerified(true);
  };

  const disabledRequest =
    emailLocal.trim().length === 0 || emailDomain.trim().length === 0;

  const disabledConfirm = code.trim().length === 0;

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
      <div className="flex flex-col gap-18 pt-21">
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
        <EmailVerifySection
          emailLocal={emailLocal}
          emailDomain={emailDomain}
          domainOptions={domainOptions}
          onChangeEmailLocal={(e) => setEmailLocal(e.target.value)}
          onChangeEmailDomain={(v) => setEmailDomain(v)}
          onRequestCode={handleRequestCode}
          code={code}
          onChangeCode={(e) => setCode(e.target.value)}
          onConfirmCode={handleConfirmCode}
          emailStatusText={emailStatusText || " "}
          emailStatusTone={emailStatusTone}
          disabledRequest={disabledRequest}
          disabledConfirm={disabledConfirm}
          isVerified={emailVerified}
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
