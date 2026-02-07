export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4 | 5;

export const PASSWORD_ALLOWED_HELPER_TEXT =
  "영문, 숫자, 특수문자 포함하여 8자 이상 입력해주세요";

export const PASSWORD_INVALID_MESSAGE =
  "영문, 숫자, 특수문자(!@#$%^&*?_.)만 사용해주세요";

export function getPasswordStrength(password: string) {
  const length = password.length;

  const hasInvalidChar = /[^a-zA-Z0-9!@#$%^&*?_.]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*?_.]/.test(password);

  const meetsBaseRule = !hasInvalidChar && hasLetter && hasNumber && hasSpecial;

  let score: PasswordStrengthLevel = 0;

  if (length === 0) score = 0;
  else if (hasInvalidChar) score = 1;
  else if (length <= 7) score = 1;
  else if (!meetsBaseRule) score = 1;
  else if (length <= 9) score = 2;
  else if (length <= 11) score = 3;
  else if (length <= 13) score = 4;
  else score = 5;

  const labelMap: Record<PasswordStrengthLevel, string> = {
    0: "",
    1: "너무 짧아요",
    2: "짧아요",
    3: "보통",
    4: "좋음",
    5: "너무 좋음",
  };

  const barClassMap: Record<PasswordStrengthLevel, string> = {
    0: "bg-transparent",
    1: "bg-red-500",
    2: "bg-orange-400",
    3: "bg-yellow-400",
    4: "bg-green-500",
    5: "bg-green-500",
  };

  const percentMap: Record<PasswordStrengthLevel, number> = {
    0: 0,
    1: 0,
    2: 25,
    3: 50,
    4: 75,
    5: 100,
  };

  return {
    score,
    label: labelMap[score],
    barClass: barClassMap[score],
    percent: percentMap[score],
    canSubmit: score >= 2 && meetsBaseRule,
    meetsBaseRule,
    hasInvalidChar,
  };
}
