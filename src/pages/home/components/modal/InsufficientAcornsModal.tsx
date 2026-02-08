import IcBigAcorn from "@/assets/icons/ic_big_acorn.svg?react";
import { Button } from "@/components/common/button/Button";
import Modal from "./Modal";

interface InsufficientAcornsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToMission: () => void;
  shortfall: number;
}

export default function InsufficientAcornsModal({
  isOpen,
  onClose,
  onGoToMission,
  shortfall,
}: InsufficientAcornsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <h4 className="heading-4 text-black">도토리가 부족해요</h4>

        <IcBigAcorn width={43} height={58} />

        <p className="body-4 mt-3 text-center text-gray-600">
          이 아이템을 구매하려면
          <br />
          도토리 {shortfall}개가 더 필요해요.
        </p>

        <div className="mt-4 flex w-full gap-12">
          <Button
            onClick={onClose}
            className="body-2 rounded-lg bg-moamoa-50 px-30 py-12 text-moamoa-600"
          >
            닫기
          </Button>
          <Button
            onClick={onGoToMission}
            className="body-2 rounded-lg bg-moamoa-300 px-35 py-12 text-white"
          >
            미션 하러가기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
