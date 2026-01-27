import type { ChangeEvent } from "react";
import { Button } from "@/components/common/button/Button";
import { PasswordTextField } from "../../components/PasswordTextField";
import { PasswordStrengthMeter } from "../../components/PasswordStrengthMeter";

type NewPasswordStepViewProps = {
  password: string;
  passwordConfirm: string;
  disabled: boolean;
  canUsePassword: boolean;
  passwordErrorMessage?: string;
  passwordConfirmErrorMessage?: string;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordConfirmChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function NewPasswordStepView({
  password,
  passwordConfirm,
  disabled,
  canUsePassword,
  passwordErrorMessage,
  passwordConfirmErrorMessage,
  onPasswordChange,
  onPasswordConfirmChange,
}: NewPasswordStepViewProps) {
  return (
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
  );
}
