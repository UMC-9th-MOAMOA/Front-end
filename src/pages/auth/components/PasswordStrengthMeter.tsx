import { getPasswordStrength } from "../utils/passwordStrength";

type Props = {
  password: string;
  helperText?: string;
};

export function PasswordStrengthMeter({ password, helperText }: Props) {
  const { label, barClass, percent } = getPasswordStrength(password);

  if (!password) {
    return helperText ? (
      <p className="text-gray-600 text-xs">{helperText}</p>
    ) : null;
  }

  return (
    <div className="flex flex-row items-center gap-14">
      <div
        className="h-4 w-80 rounded-full bg-gray-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label="비밀번호 강도"
      >
        <div
          className={`h-full rounded-full transition-all duration-200 ${barClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-gray-600 text-xs">{label}</p>
    </div>
  );
}
