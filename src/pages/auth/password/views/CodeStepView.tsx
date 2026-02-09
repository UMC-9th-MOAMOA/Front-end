import { Button } from "@/components/common/button/Button";
import { AuthTextField } from "../../components/AuthTextField";

type CodeStepViewProps = {
  code: string;
  errorText: string;
  isSending: boolean;
  isVerifying: boolean;
  resendCooldown: number;
  onCodeChange: (value: string) => void;
  onResendEmail: () => void;
  onVerifyCode: () => void;
};

export function CodeStepView({
  code,
  errorText,
  isSending,
  isVerifying,
  resendCooldown,
  onCodeChange,
  onResendEmail,
  onVerifyCode,
}: CodeStepViewProps) {
  const isResendDisabled = isSending || isVerifying || resendCooldown > 0;

  return (
    <>
      <h1 className="heading-3 mt-156 text-center text-black">
        인증번호를 입력해주세요.
      </h1>
      <p className="body-4 mt-6 text-center text-gray-600">
        제공하신 이메일 주소로 인증번호를 보내드렸습니다.
      </p>
      <div className="flex flex-col gap-8">
        <div className="mt-36">
          <AuthTextField
            name="code"
            placeholder="인증번호 입력하기"
            type="text"
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            width="full"
            variant="outlined"
          />
        </div>
        <button
          type="button"
          onClick={onResendEmail}
          className="body-4 flex justify-start text-gray-600 underline disabled:text-gray-400"
          disabled={isResendDisabled}
        >
          {resendCooldown > 0
            ? `인증 메일 재발송 (${resendCooldown}s)`
            : "인증 메일 재발송"}
        </button>

        {errorText && (
          <p className="body-5 text-left text-red-500">{errorText}</p>
        )}
      </div>

      <Button
        type="button"
        onClick={onVerifyCode}
        disabled={isVerifying}
        className="mt-24 w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
      >
        {isVerifying ? "확인 중..." : "인증번호 확인"}
      </Button>
      <p className="body-5 mt-20 text-center text-gray-500">
        <span>인증 메일이 오지 않나요?</span>
        <span className="block">스팸함을 확인하거나 재발송을 요청하세요.</span>
      </p>
    </>
  );
}
