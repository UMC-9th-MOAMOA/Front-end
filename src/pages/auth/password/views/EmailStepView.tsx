import { Button } from "@/components/common/button/Button";
import { AuthTextField } from "../../components/AuthTextField";

type EmailStepViewProps = {
  email: string;
  emailError?: string;
  errorText: string;
  isSending: boolean;
  onEmailChange: (value: string) => void;
  onSendEmail: () => void;
};

export function EmailStepView({
  email,
  emailError,
  errorText,
  isSending,
  onEmailChange,
  onSendEmail,
}: EmailStepViewProps) {
  return (
    <>
      <h1 className="heading-3 mt-156 text-left text-black">
        가입하신 이메일 주소를 입력해주세요.
      </h1>
      <p className="body-4 mt-6 text-left text-gray-600">
        입력하신 이메일은 안전하게 보호됩니다.
      </p>
      <div className="flex flex-col gap-8">
        <div className="mt-36">
          <AuthTextField
            name="email"
            placeholder="이메일 주소 입력하기"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
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
        onClick={onSendEmail}
        disabled={isSending}
        className="mt-50 w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
      >
        {isSending ? "전송 중..." : "인증 메일 보내기"}
      </Button>
      <p className="body-4 mt-26 text-center text-gray-500">
        <span>인증 메일이 오지 않나요?</span>
        <span className="block">스팸함을 확인하거나 재발송을 요청하세요.</span>
      </p>
    </>
  );
}
