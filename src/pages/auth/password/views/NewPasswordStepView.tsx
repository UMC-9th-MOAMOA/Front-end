import type { ChangeEvent } from "react";
import { Button } from "@/components/common/button/Button";
import { PasswordStrengthMeter } from "../../components/PasswordStrengthMeter";
import { PasswordTextField } from "../../components/PasswordTextField";
import { PASSWORD_ALLOWED_HELPER_TEXT } from "../../utils/passwordStrength";

type NewPasswordStepViewProps = {
  password: string;
  passwordConfirm: string;
  disabled: boolean;
  canUsePassword: boolean;
  isSubmitting?: boolean;
  isFormValid?: boolean;
  passwordErrorMessage?: string;
  passwordConfirmErrorMessage?: string;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordConfirmChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export function NewPasswordStepView({
  password,
  passwordConfirm,
  disabled,
  canUsePassword,
  isSubmitting,
  isFormValid,
  passwordErrorMessage,
  passwordConfirmErrorMessage,
  onPasswordChange,
  onPasswordConfirmChange,
  onSubmit,
}: NewPasswordStepViewProps) {
  const canSubmit = isFormValid ?? true;
  const isSubmitDisabled = disabled || isSubmitting || !canSubmit;

  return (
    <>
      <h1 className="heading-3 mt-113 text-center text-black">
        새로운 비밀번호를 입력해주세요
      </h1>
      <div className="mt-40 flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <p className="body-2 text-black">새 비밀번호</p>
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
        <div className="flex flex-col gap-10">
          <p className="body-2 text-black">새 비밀번호 확인</p>
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
            helperText={PASSWORD_ALLOWED_HELPER_TEXT}
          />
        </div>
      </div>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        className="mt-60 w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
      >
        비밀번호 변경하기
      </Button>
    </>
  );
}
