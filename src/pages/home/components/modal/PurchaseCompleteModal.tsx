import IcBigAcorn from "@/assets/icons/ic_big_acorn.svg?react";
import { Button } from "@/components/common/button/Button";
import Modal from "./Modal";

interface PurchaseCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToMission: () => void;
  name: string;
}

export default function PurchaseCompleteModal({
  isOpen,
  onClose,
  onGoToMission,
  name,
}: PurchaseCompleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <h4 className="heading-4 text-center text-black">
          <span className="text-moamoa-400">{name}</span> 구매 완료!
        </h4>

        <IcBigAcorn className="mt-3" width={43} height={58} />

        <p className="body-4 mt-3 text-center text-gray-600">
          지금 바로 아이템을 사용할 수 있어요.
        </p>

        <div className="mt-20 flex w-full gap-12">
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
