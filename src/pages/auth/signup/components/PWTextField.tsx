// signup/components/PWTextField.tsx
import type React from "react";
import { PasswordTextField } from "../../components/PasswordTextField";
import { PasswordStrengthMeter } from "./PWStrengthMeter";

export type PWTextFieldProps = {
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  passwordConfirm: string;
  onPasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  disabled?: boolean;

  passwordErrorMessage?: string;
  passwordConfirmErrorMessage?: string;

  helperText?: string;
};

export function PWTextField({
  password,
  onPasswordChange,
  passwordConfirm,
  onPasswordConfirmChange,
  disabled = false,
  passwordErrorMessage,
  passwordConfirmErrorMessage,
  helperText = "영문, 숫자, 특수문자 포함하여 8자 이상 입력해주세요",
}: PWTextFieldProps) {
  return (
    <section className="flex flex-col gap-8">
      <p className="detail text-gray-700">비밀번호</p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <PasswordTextField
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordChange}
            width="full"
            variant="ghost"
            disabled={disabled}
            errorMessage={passwordErrorMessage}
            name="password"
          />
          <PasswordStrengthMeter password={password} helperText={helperText} />
        </div>
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
      </div>
    </section>
  );
}
