import { PasswordStrengthMeter } from "@/pages/auth/components/PasswordStrengthMeter";
import { PasswordTextField } from "@/pages/auth/components/PasswordTextField";
import FormField from "../common/FormField";

type Props = {
  currentPw: string;
  newPw: string;
  newPwCheck: string;
  currentPwError?: string;
  newPwCheckError?: string;
  onChangeCurrentPw: (value: string) => void;
  onChangeNewPw: (value: string) => void;
  onChangeNewPwCheck: (value: string) => void;
};

export default function PasswordChangeForm({
  currentPw,
  newPw,
  newPwCheck,
  currentPwError,
  newPwCheckError,
  onChangeCurrentPw,
  onChangeNewPw,
  onChangeNewPwCheck,
}: Props) {
  return (
    <section className="flex h-224 w-full flex-col items-start gap-40">
      <FormField label="기존 비밀번호" className="h-77">
        <div className="w-full">
          <PasswordTextField
            value={currentPw}
            onChange={(e) => onChangeCurrentPw(e.target.value)}
            placeholder="기존 비밀번호를 입력해주세요"
            errorMessage={currentPwError}
          />
        </div>
      </FormField>

      <div className="flex w-full flex-col gap-10">
        <FormField label="새 비밀번호" className="h-99">
          <div className="flex w-full flex-col gap-6">
            <PasswordTextField
              value={newPw}
              onChange={(e) => onChangeNewPw(e.target.value)}
              placeholder="비밀번호"
            />
            <PasswordStrengthMeter
              password={newPw}
              helperText="영문 숫자 특수문자 포함 8자리 이상 입력해주세요"
            />
          </div>
        </FormField>

        <FormField label="새 비밀번호 확인" className="h-77">
          <div className="w-full">
            <PasswordTextField
              value={newPwCheck}
              onChange={(e) => onChangeNewPwCheck(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              errorMessage={newPwCheckError}
            />
          </div>
          {/* TODO(API hookup): validation / error message */}
        </FormField>
      </div>
    </section>
  );
}
