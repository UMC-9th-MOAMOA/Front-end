import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button/Button";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { Modal } from "@/pages/auth/components/Modal";
import AgreementList from "@/pages/auth/signup/components/AgreementList";
import { PWTextField } from "@/pages/auth/signup/components/PWTextField";
import {
  getPasswordStrength,
  PASSWORD_INVALID_MESSAGE,
} from "@/pages/auth/utils/passwordStrength";
import { AuthTextField } from "../components/AuthTextField";
import EmailVerifySection from "./components/EmailVerifySection";
import {
  getSendVerificationEmailErrorState,
  useSendVerificationEmail,
} from "./hooks/useMutation/useSendVerificationEmail";
import {
  getVerifyEmailAuthCodeErrorState,
  useVerifyEmailAuthCode,
} from "./hooks/useMutation/useVerifyEmailAuthCode";

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
  const [verifyModalType, setVerifyModalType] = useState<
    "success" | "error" | null
  >(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showResendCountdown, setShowResendCountdown] = useState(false);

  const { mutateAsync: sendVerificationEmail, isPending: isSendingEmail } =
    useSendVerificationEmail();
  const { mutateAsync: verifyEmailAuthCode, isPending: isVerifyingEmailCode } =
    useVerifyEmailAuthCode();

  const domainOptions = [
    "naver.com",
    "gmail.com",
    "daum.net",
    "kakao.com",
    "hanmail.net",
  ];

  const handleRequestCode = async () => {
    if (emailLocal.trim().length === 0 || emailDomain.trim().length === 0) {
      return;
    }

    const email = `${emailLocal}@${emailDomain}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailStatusText("이메일 형식이 올바르지 않습니다.");
      setEmailStatusTone("error");
      return;
    }

    setEmailStatusText("인증 메일을 보내는 중...");
    setEmailStatusTone("info");

    try {
      await sendVerificationEmail({
        email,
      });
      setEmailStatusText("인증 메일을 보냈어요");
      setEmailStatusTone("info");
      setEmailVerified(false);
      setResendCooldown(30);
      setShowResendCountdown(true);
    } catch (error) {
      const errorState = getSendVerificationEmailErrorState(error);
      if (errorState) {
        setEmailStatusText(errorState.text);
        setEmailStatusTone(errorState.tone);
        if (errorState.text.includes("30초")) {
          setResendCooldown(30);
          setShowResendCountdown(true);
        }
        return;
      }

      const serverMessage = (error as { serverMessage?: string })
        ?.serverMessage;
      setEmailStatusText(serverMessage || "인증 메일 전송에 실패했어요");
      setEmailStatusTone("error");
    }
  };

  const handleConfirmCode = async () => {
    if (emailLocal.trim().length === 0 || emailDomain.trim().length === 0) {
      setEmailStatusText("이메일을 입력해주세요.");
      setEmailStatusTone("error");
      return;
    }

    const email = `${emailLocal}@${emailDomain}`;

    setEmailStatusText("인증번호를 확인하는 중...");
    setEmailStatusTone("info");

    try {
      await verifyEmailAuthCode({
        email,
        authCode: code.trim(),
      });
      setEmailStatusText("사용 가능한 이메일");
      setEmailStatusTone("success");
      setEmailVerified(true);
      setVerifyModalType("success");
      return;
    } catch (error) {
      const errorState = getVerifyEmailAuthCodeErrorState(error);
      if (errorState) {
        setEmailStatusText(errorState.text);
        setEmailStatusTone(errorState.tone);
        setEmailVerified(false);
        setVerifyModalType("error");
        return;
      }

      const serverMessage = (error as { serverMessage?: string })
        ?.serverMessage;
      setEmailStatusText(serverMessage || "인증번호 확인에 실패했어요");
      setEmailStatusTone("error");
      setEmailVerified(false);
      setVerifyModalType("error");
    }
  };

  const disabledRequest =
    emailLocal.trim().length === 0 ||
    emailDomain.trim().length === 0 ||
    isSendingEmail ||
    resendCooldown > 0;

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = window.setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!showResendCountdown) return;
    if (resendCooldown > 0) {
      setEmailStatusText(
        `이메일 재전송은 ${resendCooldown}초 뒤에 가능합니다.`
      );
      setEmailStatusTone("error");
      return;
    }
    setShowResendCountdown(false);
    setEmailStatusText(" ");
    setEmailStatusTone("info");
  }, [resendCooldown, showResendCountdown]);

  const disabledConfirm =
    code.trim().length === 0 || isVerifyingEmailCode;

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const passwordStrength = getPasswordStrength(password);
  const canUsePassword = passwordStrength.canSubmit;
  const passwordErrorMessage = passwordStrength.hasInvalidChar
    ? PASSWORD_INVALID_MESSAGE
    : undefined;

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
          canUsePassword={canUsePassword}
          passwordErrorMessage={passwordErrorMessage}
          passwordConfirmErrorMessage={passwordConfirmErrorMessage}
        />
        <div className="mt-37">
          <AgreementList />
        </div>
      </div>
      <Modal
        open={verifyModalType !== null}
        onClose={() => setVerifyModalType(null)}
      >
        {verifyModalType === "success" ? (
          <div className="flex flex-col items-center">
            <p className="heading-3 text-moamoa-400">이메일 인증 완료</p>
            <p className="body-2 mt-20 text-gray-600">
              이메일 인증이 완료되었어요
            </p>
            <Button
              type="button"
              className="body-2 mt-32 h-48 w-full bg-moamoa-300 text-white"
              onClick={() => setVerifyModalType(null)}
            >
              확인
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="heading-3 text-red-400">인증번호 확인 실패</p>
            <p className="body-2 mt-20 text-gray-600">
              인증번호가 잘못 입력되었습니다.
            </p>
            <div className="mt-32 flex w-full gap-12">
              <Button
                type="button"
                className="body-2 h-50 w-full bg-moamoa-50 text-moamoa-600"
                onClick={() => setVerifyModalType(null)}
              >
                다시 입력
              </Button>
              <Button
                type="button"
                className="body-2 h-50 w-full bg-moamoa-300 text-white"
                onClick={() => {
                  handleRequestCode();
                  setVerifyModalType(null);
                }}
              >
                인증번호 재발송
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
