import { Button } from "@/components/common/button/Button";

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
      <div className="absolute inset-0 bg-[rgba(36,44,61,0.40)]" />

      <div
        className="relative w-full px-35"
        role="dialog"
        aria-modal="true"
        aria-labelledby="withdraw-title"
        aria-describedby="withdraw-desc"
      >
        <div className="flex w-full flex-col items-center gap-23 rounded-xl bg-white px-20 pt-28 pb-20">
          <p id="withdraw-title" className="heading-3 text-center text-warning">
            탈퇴하기
          </p>

          <div
            id="withdraw-desc"
            className="flex w-full flex-col items-center justify-center"
          >
            <p className="body-2 text-center text-gray-700">
              모아모아 계정 정보와
            </p>
            <p className="body-2 text-center text-gray-700">
              포인트와 캐릭터는
            </p>
            <p className="body-2 whitespace-nowrap text-center text-gray-700">
              30일 동안 삭제 후 복구할 수 없어요
            </p>
          </div>

          <p className="heading-5 text-center text-black">
            정말 탈퇴하시겠어요?
          </p>

          <div className="flex w-full items-center gap-12">
            <Button
              type="button"
              onClick={onCancel}
              className="flex h-50 flex-1 items-center justify-center rounded-lg bg-moamoa-50"
            >
              <span className="heading-5 whitespace-nowrap text-moamoa-400">
                취소
              </span>
            </Button>

            <Button
              type="button"
              onClick={onConfirm}
              className="flex h-50 flex-1 items-center justify-center rounded-lg bg-moamoa-300"
            >
              <span className="heading-5 whitespace-nowrap text-white">
                탈퇴
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
