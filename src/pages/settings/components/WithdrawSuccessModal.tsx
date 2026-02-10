import { Button } from "@/components/common/button/Button";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function WithdrawSuccessModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(36,44,61,0.40)]" />

      <div
        className="relative w-full px-35"
        role="dialog"
        aria-modal="true"
        aria-labelledby="withdraw-success-title"
      >
        <div className="flex w-full flex-col items-center rounded-xl bg-white px-20 pt-28 pb-20">
          <h2 id="withdraw-success-title" className="heading-4 text-black">
            계정이 삭제되었어요
          </h2>

          <p className="body-2 mt-20 whitespace-pre-line text-center text-gray-600">
            지금까지 모아모아와<br/>함께 해주셔서 감사합니다.
          </p>

          <Button
            type="button"
            onClick={onClose}
            className="body-2 mt-29 rounded-xl bg-moamoa-300 px-44 py-12 text-white"
          >
            또 만나요!
          </Button>
        </div>
      </div>
    </div>
  );
}
