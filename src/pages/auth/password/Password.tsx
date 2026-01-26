import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/LOGO.svg";
import { Button } from "@/components/common/button/Button";
import {
  mockSendResetEmail,
  mockVerifyResetCode,
} from "@/mocks/auth/passwordReset.mock";
import AuthHeader from "../components/AuthHeader";
import { AuthTextField } from "../components/AuthTextField";
import { Modal } from "../components/Modal";
import { PasswordTextField } from "../components/PasswordTextField";
import { PasswordStrengthMeter } from "../signup/components/PWStrengthMeter";
import { getPasswordStrength } from "../signup/utils/PWStrength";

type Step = "EMAIL" | "CODE" | "NEW_PASSWORD";
type Loading = null | "SEND" | "VERIFY" | "RESET";

type ApiError = {
  response?: {
    data?: {
      code?: string;
    };
  };
};

const USE_MOCK = true;

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function getServerCode(err: unknown): string | undefined {
  if (typeof err === "object" && err !== null && "response" in err) {
    return (err as ApiError).response?.data?.code;
  }
  return undefined;
}

export default function Password() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState<Loading>(null);
  const [errorText, setErrorText] = useState<string>("");
  const [noAccountModalOpen, setNoAccountModalOpen] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const [resetToken, setResetToken] = useState<string>("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState<string | undefined>(undefined);

  const { sendEmail, verifyCode } = useMemo(() => {
    if (USE_MOCK) {
      return {
        sendEmail: mockSendResetEmail,
        verifyCode: mockVerifyResetCode,
      };
    }

    return {
      sendEmail: async () => {
        throw new Error("sendEmail API not implemented");
      },
      verifyCode: async () => {
        throw new Error("verifyCode API not implemented");
      },
    };
  }, []);

  const pw = useMemo(() => getPasswordStrength(password), [password]);
  const disabled = loading === "RESET";
  const canUsePassword = pw.canSubmit;

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPassword(v);
    setErrorText("");

    if (!v) {
      setPasswordErrorMessage(undefined);
    } else if (!getPasswordStrength(v).canSubmit) {
      setPasswordErrorMessage("");
    } else {
      setPasswordErrorMessage(undefined);
    }

    if (passwordConfirm && v !== passwordConfirm) {
      setPasswordConfirmErrorMessage("비밀번호가 일치하지 않아요.");
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
      setPasswordConfirmErrorMessage("비밀번호가 일치하지 않아요.");
    } else {
      setPasswordConfirmErrorMessage(undefined);
    }
  };

  const handleSendEmail = async () => {
    setErrorText("");
    setEmailError(undefined);

    if (!isValidEmail(email)) {
      setEmailError("이메일 형식을 확인해주세요.");
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

      setErrorText("인증 메일 전송에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(null);
    }
  };

  const handleVerifyCode = async () => {
    setErrorText("");

    if (!code.trim()) {
      setErrorText("인증번호를 입력해주세요.");
      return;
    }

    try {
      setLoading("VERIFY");
      const data = await verifyCode(email, code, "SUCCESS");
      setResetToken(data.resetToken);
      setStep("NEW_PASSWORD");
      if (USE_MOCK) console.log("mock resetToken:", data.resetToken);
    } catch (e: unknown) {
      const serverCode = getServerCode(e);

      if (serverCode === "CODE_MISMATCH" || serverCode === "INVALID_CODE") {
        setErrorText("인증번호가 올바르지 않아요.");
      } else if (serverCode === "CODE_EXPIRED") {
        setErrorText("인증번호가 만료됐어요. 재발송을 요청해주세요.");
      } else {
        setErrorText("인증에 실패했어요. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 공통 헤더 */}
      <AuthHeader title="비밀번호 재설정" iconType="arrow" />
      <img
        src={Logo}
        alt="모아모아 로고"
        className="mx-auto mt-129 block h-auto w-193"
      />

      {/* 가입 안 된 이메일 안내 모달 */}
      <Modal
        open={noAccountModalOpen}
        onClose={() => setNoAccountModalOpen(false)}
      >
        <h2 className="heading-3 text-center text-red-500">
          회원 정보를 찾을 수 없습니다
        </h2>

        <p className="body-2 mt-20 text-center text-gray-600">
          이메일 주소를 다시 확인하시거나,
          <br />
          회원가입을 진행해 주세요.
        </p>
        <div className="mt-32 flex justify-center gap-12">
          <Button
            type="button"
            onClick={() => setNoAccountModalOpen(false)}
            className="w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
          >
            다시 입력
          </Button>
          <Button
            type="button"
            onClick={() => {
              setNoAccountModalOpen(false);
              navigate("/signup");
            }}
            className="w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
          >
            회원가입
          </Button>
        </div>
      </Modal>

      {/* 이메일 주소 입력 스텝 */}
      {step === "EMAIL" && (
        <>
          <h1 className="heading-3 mt-50 text-center text-black">
            가입하신 이메일 주소를 입력해주세요.
          </h1>
          <p className="body-4 mt-6 text-center text-gray-600">
            입력하신 이메일은 안전하게 보호됩니다.
          </p>
          <div className="flex flex-col gap-8">
            <div className="mt-16">
              <AuthTextField
                name="email"
                placeholder="이메일 주소를 입력해주세요"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(undefined);
                }}
                width="full"
                variant="outlined"
                errorMessage={emailError}
              />
            </div>
            {errorText && (
              <p className="body-5 text-right text-red-500">{errorText}</p>
            )}
          </div>
          <Button
            type="button"
            onClick={handleSendEmail}
            disabled={loading === "SEND"}
            className="mt-46 w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
          >
            {loading === "SEND" ? "전송 중..." : "인증 메일 보내기"}
          </Button>
          <p className="body-4 mt-20 text-center text-gray-500">
            <span>인증 메일이 오지 않나요?</span>
            <span className="block">
              스팸함을 확인하거나 재발송을 요청하세요.
            </span>
          </p>
        </>
      )}

      {/* 인증 코드 입력 스텝 */}
      {step === "CODE" && (
        <>
          <h1 className="heading-3 mt-50 text-center text-black">
            인증번호를 입력해주세요.
          </h1>
          <p className="body-4 mt-6 text-center text-gray-600">
            제공하신 이메일 주소로 인증번호를 보내드렸습니다.
          </p>
          <div className="flex flex-col gap-8">
            <div className="mt-8">
              <AuthTextField
                name="code"
                placeholder="인증번호 입력"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                width="full"
                variant="outlined"
              />
            </div>
            <button
              type="button"
              onClick={handleSendEmail}
              className="body-4 flex justify-start text-gray-600 underline disabled:text-gray-400"
              disabled={loading === "SEND"}
            >
              인증 메일 재발송
            </button>

            {errorText && (
              <p className="body-5 text-left text-red-500">{errorText}</p>
            )}
          </div>

          <Button
            type="button"
            onClick={handleVerifyCode}
            disabled={loading === "VERIFY"}
            className="mt-20 w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
          >
            {loading === "VERIFY" ? "확인 중..." : "인증번호 확인"}
          </Button>
          <p className="body-4 mt-20 text-center text-gray-500">
            <span>인증 메일이 오지 않나요?</span>
            <span className="block">
              스팸함을 확인하거나 재발송을 요청하세요.
            </span>
          </p>
        </>
      )}

      {/* 새 비밀번호 설정 스텝 */}
      {step === "NEW_PASSWORD" && (
        <>
          <h1 className="heading-3 mt-40 text-center text-black">
            새로운 비밀번호 입력해주세요
          </h1>
          <div className="flex flex-col">
            <div className="mb-20 flex flex-col gap-6">
              <p className="body-2 mt-22 mb-10 text-black">새 비밀번호</p>
              <PasswordTextField
                placeholder="비밀번호"
                value={password}
                onChange={onPasswordChange}
                width="full"
                variant="ghost"
                disabled={disabled}
                error={!canUsePassword && password.length > 0}
                errorMessage={passwordErrorMessage}
                name="password"
              />
            </div>
            <div className="flex flex-col gap-6">
              <p className="body-2 mb-10 text-black">새 비밀번호 확인</p>
              <PasswordTextField
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
                width="full"
                variant="ghost"
                disabled={disabled}
                errorMessage={passwordConfirmErrorMessage}
                name="passwordConfirm"
              />
              <PasswordStrengthMeter
                password={password}
                helperText="영문 숫자 특수문자를 포함한 8자 이상 입력해주세요"
              />
            </div>
          </div>
          <Button
            type="button"
            className="mt-30 w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
          >
            비밀번호 변경하기
          </Button>
        </>
      )}
    </div>
  );
}
