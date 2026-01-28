import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  mockSendResetEmail,
  mockVerifyResetCode,
} from "@/mocks/auth/passwordReset.mock";
import AuthHeader from "../components/AuthHeader";
import {
  getPasswordStrength,
  PASSWORD_INVALID_MESSAGE,
} from "../utils/passwordStrength";
import {
  getServerCode,
  isValidEmail,
  type Loading,
  PASSWORD_RESET_MESSAGES,
  type Step,
  USE_MOCK,
} from "./passwordReset.shared";
import { CodeStepView } from "./views/CodeStepView";
import { EmailStepView } from "./views/EmailStepView";
import { NewPasswordStepView } from "./views/NewPasswordStepView";
import { NoAccountModalView } from "./views/NoAccountModalView";

export default function Password() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState<Loading>(null);
  const [errorText, setErrorText] = useState<string>("");
  const [noAccountModalOpen, setNoAccountModalOpen] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState<string | undefined>(undefined);

  const sendEmail = USE_MOCK
    ? mockSendResetEmail
    : async () => {
        throw new Error("sendEmail API not implemented");
      };

  const verifyCode = USE_MOCK
    ? mockVerifyResetCode
    : async () => {
        throw new Error("verifyCode API not implemented");
      };

  const pw = useMemo(() => getPasswordStrength(password), [password]);
  const disabled = loading !== null;
  const canUsePassword = pw.canSubmit;

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPassword(v);
    setErrorText("");

    if (!v) {
      setPasswordErrorMessage(undefined);
    } else {
      const strength = getPasswordStrength(v);
      if (strength.hasInvalidChar) {
        setPasswordErrorMessage(PASSWORD_INVALID_MESSAGE);
      } else if (!strength.canSubmit) {
        setPasswordErrorMessage("");
      } else {
        setPasswordErrorMessage(undefined);
      }
    }

    if (passwordConfirm && v !== passwordConfirm) {
      setPasswordConfirmErrorMessage(PASSWORD_RESET_MESSAGES.passwordMismatch);
    } else {
      setPasswordConfirmErrorMessage(undefined);
    }
  };

  const onPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPasswordConfirm(v);
    setErrorText("");

    if (!v) {
      setPasswordConfirmErrorMessage(undefined);
    } else if (v !== password) {
      setPasswordConfirmErrorMessage(PASSWORD_RESET_MESSAGES.passwordMismatch);
    } else {
      setPasswordConfirmErrorMessage(undefined);
    }
  };

  const handleSendEmail = async () => {
    setErrorText("");
    setEmailError(undefined);

    if (!isValidEmail(email)) {
      setEmailError(PASSWORD_RESET_MESSAGES.emailInvalid);
      return;
    }

    try {
      setLoading("SEND");
      await sendEmail(email, "SUCCESS");
      setStep("CODE");
    } catch (e: unknown) {
      const serverCode = getServerCode(e);

      if (serverCode === "USER_NOT_FOUND") {
        setNoAccountModalOpen(true);
        return;
      }

      setErrorText(PASSWORD_RESET_MESSAGES.emailSendFailed);
    } finally {
      setLoading(null);
    }
  };

  const handleVerifyCode = async () => {
    setErrorText("");

    if (!code.trim()) {
      setErrorText(PASSWORD_RESET_MESSAGES.codeRequired);
      return;
    }

    try {
      setLoading("VERIFY");
      await verifyCode(email, code, "SUCCESS");
      setStep("NEW_PASSWORD");
    } catch (e: unknown) {
      const serverCode = getServerCode(e);

      if (serverCode === "CODE_MISMATCH" || serverCode === "INVALID_CODE") {
        setErrorText(PASSWORD_RESET_MESSAGES.codeInvalid);
      } else if (serverCode === "CODE_EXPIRED") {
        setErrorText(PASSWORD_RESET_MESSAGES.codeExpired);
      } else {
        setErrorText(PASSWORD_RESET_MESSAGES.verifyFailed);
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 공통 헤더 */}
      <AuthHeader title="비밀번호 재설정" iconType="close" />

      {/* 가입 안 된 이메일 안내 모달 */}
      <NoAccountModalView
        open={noAccountModalOpen}
        onClose={() => setNoAccountModalOpen(false)}
        onRetry={() => setNoAccountModalOpen(false)}
        onSignup={() => {
          setNoAccountModalOpen(false);
          navigate("/signup");
        }}
      />

      {/* 이메일 주소 입력 스텝 */}
      {step === "EMAIL" && (
        <EmailStepView
          email={email}
          emailError={emailError}
          errorText={errorText}
          isSending={loading === "SEND"}
          onEmailChange={(value) => {
            setEmail(value);
            setEmailError(undefined);
          }}
          onSendEmail={handleSendEmail}
        />
      )}

      {/* 인증 코드 입력 스텝 */}
      {step === "CODE" && (
        <CodeStepView
          code={code}
          errorText={errorText}
          isSending={loading === "SEND"}
          isVerifying={loading === "VERIFY"}
          onCodeChange={setCode}
          onResendEmail={handleSendEmail}
          onVerifyCode={handleVerifyCode}
        />
      )}

      {/* 새 비밀번호 설정 스텝 */}
      {step === "NEW_PASSWORD" && (
        <NewPasswordStepView
          password={password}
          passwordConfirm={passwordConfirm}
          disabled={disabled}
          canUsePassword={canUsePassword}
          passwordErrorMessage={passwordErrorMessage}
          passwordConfirmErrorMessage={passwordConfirmErrorMessage}
          onPasswordChange={onPasswordChange}
          onPasswordConfirmChange={onPasswordConfirmChange}
        />
      )}
    </div>
  );
}
