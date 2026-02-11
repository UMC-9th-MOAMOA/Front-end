import type { ReactNode } from "react";
import { Button } from "@/components/common/button/Button";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: ReactNode;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
};

export default function RetryMissionModal({
  open,
  onConfirm,
  onCancel,
  title = (
    <>
      다시 풀 때는
      <br />
      도토리가 지급되지 않아요.
    </>
  ),
  description = <>그래도 진행하시겠어요?</>,
  confirmText = "다시 풀기",
  cancelText = "아니요",
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(36,44,61,0.40)]" />

      <div
        className="relative w-full px-35"
        role="dialog"
        aria-modal="true"
        aria-labelledby="retry-mission-title"
        aria-describedby="retry-mission-desc"
      >
        <div className="flex w-full flex-col items-center gap-20 rounded-xl bg-white px-20 pt-28 pb-20">
          <p
            id="retry-mission-title"
            className="heading-4 text-center text-black"
          >
            {title}
          </p>

          <p
            id="retry-mission-desc"
            className="body-2 text-center text-gray-600"
          >
            {description}
          </p>

          <div className="flex w-full items-center justify-center gap-12">
            <Button
              type="button"
              onClick={onCancel}
              className="flex h-48 w-124 items-center justify-center rounded-lg bg-gray-200 px-30"
            >
              <span className="heading-5 whitespace-nowrap text-black">
                {cancelText}
              </span>
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="flex h-48 w-124 items-center justify-center rounded-lg bg-moamoa-300 px-30"
            >
              <span className="heading-5 whitespace-nowrap text-white">
                {confirmText}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
