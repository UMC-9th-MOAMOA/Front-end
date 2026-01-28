// EmailVerifySection.tsx
import { Button } from "@/components/common/button/Button";
import { AuthTextField } from "@/pages/auth/components/AuthTextField";
import { cn } from "@/utils/cn/cn";
import EmailDomainSelect from "./EmailDomainSelect";

type EmailVerifySectionProps = {
  emailLocal: string;
  emailDomain: string;
  domainOptions: string[];

  onChangeEmailLocal: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmailDomain: (v: string) => void;

  onRequestCode: () => void;

  code: string;
  onChangeCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmCode: () => void;

  emailStatusText?: string; // "사용 가능한 이메일"
  emailStatusTone?: "success" | "error" | "info";

  disabledRequest?: boolean;
  disabledConfirm?: boolean;
  isVerified?: boolean;
};

export default function EmailVerifySection({
  emailLocal,
  emailDomain,
  domainOptions,
  onChangeEmailLocal,
  onChangeEmailDomain,
  onRequestCode,
  code,
  onChangeCode,
  onConfirmCode,
  emailStatusText = "사용 가능한 이메일",
  emailStatusTone = "success",
  disabledRequest,
  disabledConfirm,
  isVerified = false,
}: EmailVerifySectionProps) {
  const statusClass =
    emailStatusTone === "success"
      ? "text-blue-500"
      : emailStatusTone === "error"
        ? "text-red-500"
        : "text-gray-500";

  return (
    <section className="flex flex-col gap-8">
      <p className="body-2 text-gray-800">아이디 (이메일)</p>
      <p className={cn("body-4 text-right", statusClass)}>{emailStatusText}</p>
      <div className="flex w-full items-center">
        <div className="flex-1">
          <AuthTextField
            placeholder="이메일을 입력해주세요"
            value={emailLocal}
            onChange={onChangeEmailLocal}
            width="full"
            height="sm"
            variant="ghost"
            disabled={isVerified}
          />
        </div>

        <span className="body-2 mr-2 ml-4 text-gray-700">@</span>

        <EmailDomainSelect
          value={emailDomain}
          onChange={onChangeEmailDomain}
          options={domainOptions}
          className="w-90"
          disabled={isVerified}
        />
        <div className="ml-8">
          <Button
            onClick={onRequestCode}
            disabled={isVerified || disabledRequest}
            className="body-3 h-42 w-57 bg-moamoa-50 text-moamoa-400 active:bg-moamoa-300 active:text-white"
          >
            인증
          </Button>
        </div>
      </div>

      {/* 인증번호 입력 + 확인 버튼 */}
      <div className="flex w-full items-center">
        <div className="flex-1">
          <AuthTextField
            placeholder="인증번호 입력"
            type="text"
            value={code}
            onChange={onChangeCode}
            variant="ghost"
            width="full"
            height="sm"
            disabled={isVerified}
          />
        </div>
        <div className="ml-12">
          <Button
            type="button"
            onClick={onConfirmCode}
            disabled={isVerified || disabledConfirm}
            className="body-3 h-42 w-103 bg-moamoa-50 text-moamoa-400 active:bg-moamoa-300 active:text-white"
          >
            인증번호 확인
          </Button>
        </div>
      </div>
    </section>
  );
}
