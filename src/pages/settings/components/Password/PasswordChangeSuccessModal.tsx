import { useId } from "react";
import { Button } from "@/components/common/button/Button";

type Props = {
  open: boolean;
  onConfirm: () => void;
};

export default function PasswordChangeSuccessModal({ open, onConfirm }: Props) {
  const titleId = useId();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-25">
      <div className="absolute inset-0 bg-[rgba(36,44,61,0.40)]" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-245 w-full flex-col items-center gap-20 rounded-xl bg-white px-20 pt-28 pb-20"
      >
        <p id={titleId} className="heading-3 text-center text-moamoa-400">
          비밀번호 변경완료
        </p>

        <div className="flex w-full flex-col items-center gap-0 self-stretch">
          <p className="heading-5 w-full text-center text-black">비밀번호가</p>
          <p className="heading-5 w-full text-center text-black">
            안전하게 변경되었어요
          </p>
          <p className="body-2 mt-8 w-full text-center text-gray-600">
            다시 로그인하고 이용해주세요
          </p>
        </div>

        <Button
          type="button"
          onClick={onConfirm}
          className="flex h-50 w-full items-center justify-center rounded-lg bg-moamoa-300"
        >
          <span className="heading-5 whitespace-nowrap text-white">확인</span>
        </Button>
      </div>
    </div>
  );
}
