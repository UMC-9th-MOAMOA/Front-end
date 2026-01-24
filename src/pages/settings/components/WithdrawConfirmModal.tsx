type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function WithdrawConfirmModal({
  open,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-[rgba(36,44,61,0.40)]" />

      {/* modal box */}
      <div className="relative flex w-[300px] flex-col items-center gap-[23px] rounded-[16px] bg-[var(--color-white)] px-[20px] pt-[28px] pb-[20px]">
        {/* title */}
        <p className="heading-3 text-center text-[var(--color-warning)]">
          {"탈퇴하기"}
        </p>

        {/* description box (210 x 63) */}
        <div className="flex w-[210px] flex-col items-center justify-center">
          <p className="body-2 text-center text-[var(--color-gray-700)]">
            {"모아모아 계정 정보와"}
          </p>
          <p className="body-2 text-center text-[var(--color-gray-700)]">
            {"도토리 및 캐릭터는"}
          </p>
          <p className="body-2 whitespace-nowrap text-center text-[var(--color-gray-700)]">
            {"30일 후 삭제되어 복구할 수 없어요"}
          </p>
        </div>

        {/* question */}
        <p className="heading-5 text-center text-[var(--color-black)]">
          {"정말 탈퇴하시겠어요?"}
        </p>

        {/* buttons row (260 x 50) */}
        <div className="flex h-[50px] w-[260px] items-center justify-center gap-[12px] self-stretch">
          {/* cancel button */}
          <button
            type="button"
            onClick={onCancel}
            className="flex h-[50px] w-[124px] items-center justify-center rounded-[12px] bg-[var(--color-moamoa-50)]"
          >
            <span className="heading-5 whitespace-nowrap text-[var(--color-moamoa-400)]">
              {"취소"}
            </span>
          </button>

          {/* confirm button */}
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-[50px] w-[124px] items-center justify-center rounded-[12px] bg-[var(--color-moamoa-300)]"
          >
            <span className="heading-5 whitespace-nowrap text-[var(--color-white)]">
              {"탈퇴"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
