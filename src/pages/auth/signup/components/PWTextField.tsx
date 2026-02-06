// signup/components/PWTextField.tsx
import type React from "react";
import { PasswordStrengthMeter } from "../../components/PasswordStrengthMeter";
import { PasswordTextField } from "../../components/PasswordTextField";
import { PASSWORD_ALLOWED_HELPER_TEXT } from "../../utils/passwordStrength";

export type PWTextFieldProps = {
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  passwordConfirm: string;
  onPasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  disabled?: boolean;
  canUsePassword?: boolean;

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
  canUsePassword = true,
  passwordErrorMessage,
  passwordConfirmErrorMessage,
  helperText = PASSWORD_ALLOWED_HELPER_TEXT,
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
            error={!canUsePassword && password.length > 0}
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
