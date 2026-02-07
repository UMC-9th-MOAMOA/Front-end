import { Controller, useWatch } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { PasswordStrengthMeter } from "@/pages/auth/components/PasswordStrengthMeter";
import { PasswordTextField } from "@/pages/auth/components/PasswordTextField";
import type { ChangePasswordRequest } from "@/types/password/password";
import FormField from "../common/FormField";

type Props = {
  control: Control<ChangePasswordRequest>;
  errors: FieldErrors<ChangePasswordRequest>;
  serverCurrentPwError?: string;
  serverNewPwCheckError?: string;
};

export default function PasswordChangeForm({
  control,
  errors,
  serverCurrentPwError,
  serverNewPwCheckError,
}: Props) {
  const newPw = useWatch({ control, name: "newPassword" });

  return (
    <section className="flex h-224 w-full flex-col items-start gap-40">
      <FormField label="기존 비밀번호" className="min-h-77">
        <div className="w-full">
          <Controller
            name="currentPassword"
            control={control}
            rules={{ required: "기존 비밀번호를 입력해주세요" }}
            render={({ field }) => (
              <PasswordTextField
                value={field.value}
                onChange={field.onChange}
                placeholder="기존 비밀번호를 입력해주세요"
                errorMessage={
                  errors.currentPassword?.message ?? serverCurrentPwError
                }
              />
            )}
          />
        </div>
      </FormField>

      <div className="flex w-full flex-col gap-10">
        <FormField label="새 비밀번호" className="min-h-99">
          <div className="flex w-full flex-col gap-6">
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: "비밀번호를 입력해주세요" }}
              render={({ field }) => (
                <PasswordTextField
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="비밀번호"
                  errorMessage={errors.newPassword?.message}
                />
              )}
            />
            <PasswordStrengthMeter
              password={newPw}
              helperText="영문 숫자 특수문자 포함 8자리 이상 입력해주세요"
            />
          </div>
        </FormField>

        <FormField label="새 비밀번호 확인" className="min-h-77">
          <div className="w-full">
            <Controller
              name="newPasswordCheck"
              control={control}
              rules={{ required: "비밀번호를 입력해주세요" }}
              render={({ field }) => (
                <PasswordTextField
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="비밀번호를 입력해주세요"
                  errorMessage={
                    errors.newPasswordCheck?.message ?? serverNewPwCheckError
                  }
                />
              )}
            />
          </div>
          {/* TODO(API hookup): validation / error message */}
        </FormField>
      </div>
    </section>
  );
}
