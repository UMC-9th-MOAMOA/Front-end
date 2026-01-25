import { Button } from "@/components/common/button/Button";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LogoutConfirmModal({
  open,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(36,44,61,0.40)]" />

      <div className="relative w-full px-35">
        <div className="flex w-full flex-col items-center gap-23 rounded-xl bg-[var(--color-white)] px-20 pt-28 pb-20">
          <p className="heading-3 text-center text-[var(--color-warning)]">
            로그아웃 하시겠습니까?
          </p>

          <p className="body-2 whitespace-pre-line text-center text-[var(--color-gray-600)]">
            로그아웃 후 다시 로그인해야{"\n"}
            서비스를 이용할 수 있어요.
          </p>

          <div className="flex w-full items-center gap-12">
            <Button
              type="button"
              onClick={onCancel}
              className="flex h-50 flex-1 items-center justify-center rounded-lg bg-[var(--color-moamoa-50)]"
            >
              <span className="heading-5 whitespace-nowrap text-[var(--color-moamoa-400)]">
                아니요
              </span>
            </Button>

            <Button
              type="button"
              onClick={onConfirm}
              className="flex h-50 flex-1 items-center justify-center rounded-lg bg-[var(--color-moamoa-300)]"
            >
              <span className="heading-5 whitespace-nowrap text-[var(--color-white)]">
                예
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
