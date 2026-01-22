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
      <AuthHeader title="비밀번호 재설정" />
      <img
        src={Logo}
        alt="모아모아 로고"
        className="mx-auto mt-43 block h-auto w-193"
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
            variant="secondary"
            size="sm"
            onClick={() => setNoAccountModalOpen(false)}
          >
            다시 입력
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              setNoAccountModalOpen(false);
              navigate("/signup");
            }}
          >
            회원가입
          </Button>
        </div>
      </Modal>

      {/* 이메일 주소 입력 스텝 */}
      {step === "EMAIL" && (
        <>
          <h1 className="heading-3 mt-116 text-center text-black">
            가입하신 이메일 주소를 입력해주세요
          </h1>
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
            <p className="body-5 mt-6 text-left text-red-500">{errorText}</p>
          )}
          <Button
            type="button"
            variant="primary"
            size="full"
            className="mt-74"
            onClick={handleSendEmail}
            disabled={loading === "SEND"}
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
          <h1 className="heading-3 mt-116 text-center text-black">
            인증번호를 입력해주세요
          </h1>

          <div className="mt-16">
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
          {errorText && (
            <p className="body-5 mt-6 text-left text-red-500">{errorText}</p>
          )}

          <Button
            type="button"
            variant="primary"
            size="full"
            className="mt-74"
            onClick={handleVerifyCode}
            disabled={loading === "VERIFY"}
          >
            {loading === "VERIFY" ? "확인 중..." : "인증번호 확인"}
          </Button>
        </>
      )}

      {/* 새 비밀번호 설정 스텝 */}
      {step === "NEW_PASSWORD" && (
        <>
          <h1 className="heading-3 mt-116 text-center text-black">
            새로운 비밀번호 입력해주세요
          </h1>
          <Button type="button" variant="primary" size="full" className="mt-74">
            비밀번호 변경하기
          </Button>
        </>
      )}
    </div>
  );
}
