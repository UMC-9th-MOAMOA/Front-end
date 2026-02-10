import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "@/apis/storage";
import { Button } from "@/components/common/button/Button";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { Modal } from "@/pages/auth/components/Modal";
import AgreementList from "@/pages/auth/signup/components/AgreementList";
import { PWTextField } from "@/pages/auth/signup/components/PWTextField";
import {
  getPasswordStrength,
  PASSWORD_INVALID_MESSAGE,
} from "@/pages/auth/utils/passwordStrength";
import { useAuthStore } from "@/store/auth";
import { useSignUpStore } from "@/store/signup";
import { AuthTextField } from "../components/AuthTextField";
import EmailVerifySection from "./components/EmailVerifySection";
import { TERMS } from "@/pages/auth/terms/constants/terms";
import { useSendVerificationEmail } from "./hooks/useMutation/useSendVerificationEmail";
import { useSignUp } from "./hooks/useMutation/useSignUp";
import { useVerifyEmailAuthCode } from "./hooks/useMutation/useVerifyEmailAuthCode";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    name,
    setName,
    emailLocal,
    setEmailLocal,
    emailDomain,
    setEmailDomain,
    code,
    setCode,
    emailVerified,
    setEmailVerified,
    emailLocked,
    setEmailLocked,
    emailStatusText,
    setEmailStatusText,
    emailStatusTone,
    setEmailStatusTone,
    verifyModalType,
    setVerifyModalType,
    verifyModalMessage,
    setVerifyModalMessage,
    resendCooldown,
    setResendCooldown,
    showResendCountdown,
    setShowResendCountdown,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    signUpError,
    setSignUpError,
    agreements,
    reset: resetSignUp,
  } = useSignUpStore();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setPolicyAgreed = useAuthStore((state) => state.setPolicyAgreed);

  const { mutate: sendVerificationEmail, isPending: isSendingEmail } =
    useSendVerificationEmail({
      onSuccess: () => {
        setEmailStatusText("인증 메일을 보냈어요");
        setEmailStatusTone("info");
        setEmailVerified(false);
        setEmailLocked(true);
        setResendCooldown(30);
        setShowResendCountdown(true);
      },
      onErrorState: (errorState) => {
        setEmailStatusText(errorState.text);
        setEmailStatusTone(errorState.tone);
        if (errorState.text.includes("30초")) {
          setResendCooldown(30);
          setShowResendCountdown(true);
        }
      },
      onUnknownError: (message) => {
        setEmailStatusText(message);
        setEmailStatusTone("error");
      },
    });
  const { mutate: verifyEmailAuthCode, isPending: isVerifyingEmailCode } =
    useVerifyEmailAuthCode({
      onSuccess: () => {
        setEmailStatusText("사용 가능한 이메일");
        setEmailStatusTone("success");
        setEmailVerified(true);
        setShowResendCountdown(false);
        setResendCooldown(0);
        setVerifyModalType("success");
      },
      onErrorState: (errorState) => {
        setEmailStatusText(" ");
        setEmailStatusTone("info");
        setEmailVerified(false);
        setVerifyModalMessage(errorState.text);
        setVerifyModalType("error");
      },
      onUnknownError: (message) => {
        setEmailStatusText(" ");
        setEmailStatusTone("info");
        setEmailVerified(false);
        setVerifyModalMessage(message);
        setVerifyModalType("error");
      },
    });
  const { mutate: signUp, isPending: isSigningUp } = useSignUp({
    onSuccess: (result) => {
      storage.setToken(result.token.accessToken);
      storage.setPolicyAgreed(result.policyAgreed);
      setAuthenticated(true);
      setPolicyAgreed(result.policyAgreed);
      resetSignUp();
      navigate("/home", { replace: true });
    },
    onErrorMessage: (message) => {
      setSignUpError(message);
    },
  });

  const domainOptions = ["naver.com", "gmail.com"];

  const handleRequestCode = () => {
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
    sendVerificationEmail({ email });
  };

  const handleConfirmCode = () => {
    if (emailLocal.trim().length === 0 || emailDomain.trim().length === 0) {
      setEmailStatusText("이메일을 입력해주세요.");
      setEmailStatusTone("error");
      return;
    }

    const email = `${emailLocal}@${emailDomain}`;

    setEmailStatusText("인증번호를 확인하는 중...");
    setEmailStatusTone("info");

    verifyEmailAuthCode({
      email,
      authCode: code.trim(),
    });
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
  }, [resendCooldown, setResendCooldown]);

  useEffect(() => {
    if (!showResendCountdown) return;
    if (emailVerified) return;
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
  }, [
    resendCooldown,
    showResendCountdown,
    emailVerified,
    setShowResendCountdown,
    setEmailStatusText,
    setEmailStatusTone,
  ]);

  const disabledConfirm = code.trim().length === 0 || isVerifyingEmailCode;

  const passwordStrength = getPasswordStrength(password);
  const canUsePassword = passwordStrength.canSubmit;
  const passwordErrorMessage = passwordStrength.hasInvalidChar
    ? PASSWORD_INVALID_MESSAGE
    : undefined;

  const passwordConfirmErrorMessage =
    passwordConfirm.length > 0 && password !== passwordConfirm
      ? "비밀번호가 일치하지 않습니다."
      : undefined;

  const canStart =
    name.trim().length > 0 &&
    emailVerified &&
    canUsePassword &&
    passwordConfirm.length > 0 &&
    !passwordConfirmErrorMessage &&
    agreements.terms &&
    agreements.privacy &&
    agreements.privacyCollection;

  const handleStart = () => {
    if (!canStart || isSigningUp) return;

    setSignUpError("");
    const email = `${emailLocal}@${emailDomain}`;
    const agreedTerms = TERMS.map((term) => ({
      policyId: term.policyId,
      isAgreed: agreements[term.key],
    }));

    signUp({
      email,
      password,
      passwordCheck: passwordConfirm,
      name: name.trim(),
      agreedTerms,
    });
  };

  return (
    <div>
      <AuthHeader
        title="회원가입"
        onBack={() => {
          resetSignUp();
          navigate("/login");
        }}
      />
      <div className="flex flex-col gap-18 pt-50 pb-120">
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
          disabledEmailInput={emailLocked || isSendingEmail}
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
      <div className="fixed inset-x-0 bottom-0 z-10 bg-white px-24 pt-10 shadow-[0px_-8px_50px_3px_rgba(0,0,0,0.10)]">
        {signUpError ? (
          <p className="body-4 mb-8 text-red-400">{signUpError}</p>
        ) : null}
        <Button
          type="button"
          disabled={!canStart || isSigningUp}
          className="body-2 h-48 w-full rounded-xl bg-moamoa-300 text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-600"
          onClick={handleStart}
          aria-busy={isSigningUp}
        >
          {isSigningUp ? "가입 중..." : "시작하기"}
        </Button>
        <div className="h-28" />
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
            <p className="body-2 mt-20 text-gray-600">{verifyModalMessage}</p>
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
