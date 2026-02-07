import { Button } from "@/components/common/button/Button";

type Props = {
  open: boolean;
  onConfirm: () => void;
};

export default function InterestsSuccessModal({ open, onConfirm }: Props) {
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
            관심사 변경 완료 !
          </p>

          <p
            id="interests-success-desc"
            className="body-2 whitespace-pre-line text-center text-gray-600"
          >
            목표 미션 개수가 저장 되었습니다.
            {"\n"}새로운 기준은 다음 주부터 적용됩니다.
          </p>

          <div className="flex w-full items-center justify-center">
            <Button
              type="button"
              onClick={onConfirm}
              className="flex h-48 w-154 items-center justify-center rounded-lg bg-moamoa-300"
            >
              <span className="heading-5 whitespace-nowrap text-white">
                확인
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
