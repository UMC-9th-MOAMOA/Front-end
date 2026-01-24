type Props = {
  open: boolean;
  onConfirm: () => void;
};

export default function PasswordChangeSuccessModal({ open, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-[rgba(36,44,61,0.40)]" />

      {/* modal box */}
      <div className="relative flex h-[245px] w-[300px] flex-col items-center gap-[20px] rounded-[16px] bg-[var(--color-white)] px-[20px] pt-[28px] pb-[20px]">
        {/* title */}
        <p className="heading-3 text-center text-[var(--color-moamoa-400)]">
          비밀번호 변경완료
        </p>

        {/* message block */}
        <div className="flex w-full flex-col items-center gap-0 self-stretch">
          <p className="heading-5 w-[260px] text-center text-[var(--color-black)]">
            비밀번호가
          </p>
          <p className="heading-5 w-[260px] text-center text-[var(--color-black)]">
            안전하게 변경되었어요{" "}
          </p>
          <p className="body-2 mt-8 w-[260px] text-center text-[var(--color-gray-600)]">
            다시 로그인하고 이용해주세요
          </p>
        </div>

        {/* confirm button */}
        <button
          type="button"
          onClick={onConfirm}
          className="flex h-[50px] w-[154px] items-center justify-center rounded-[12px] bg-[var(--color-moamoa-300)]"
        >
          <span className="heading-5 whitespace-nowrap text-[var(--color-white)]">
            확인
          </span>
        </button>
      </div>
    </div>
  );
}
