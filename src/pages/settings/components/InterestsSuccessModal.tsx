import type { ReactNode } from "react";
import { Button } from "@/components/common/button/Button";

type Props = {
  open: boolean;
  onConfirm: () => void;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
};

export default function InterestsSuccessModal({
  open,
  onConfirm,
  title = "관심사 변경 완료!",
  description = (
    <>
      이제 새로운 관심사를
      <br />
      기반으로 콘텐츠가 추천돼요.
    </>
  ),
  confirmText = "확인",
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(36,44,61,0.40)]" />

      <div
        className="relative w-full px-35"
        role="dialog"
        aria-modal="true"
        aria-labelledby="interests-success-title"
        aria-describedby="interests-success-desc"
      >
        <div className="flex w-full flex-col items-center gap-20 rounded-xl bg-white px-20 pt-28 pb-20">
          <p
            id="interests-success-title"
            className="heading-3 text-center text-moamoa-400"
          >
            {title}
          </p>

          <p id="interests-success-desc" className="body-2 text-center text-gray-600">
            {description}
          </p>

          <div className="flex w-full items-center justify-center">
            <Button
              type="button"
              onClick={onConfirm}
              className="flex h-48 w-154 items-center justify-center rounded-lg bg-moamoa-300"
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
