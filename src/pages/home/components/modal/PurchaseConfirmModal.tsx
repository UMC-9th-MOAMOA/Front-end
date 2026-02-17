import { Button } from "@/components/common/button/Button";
import Modal from "./Modal";

interface PurchaseConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  price: number;
}

export default function PurchaseConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  price,
}: PurchaseConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h4 className="heading-4 text-center text-black">
          이 아이템을
          <br /> 구매하시겠어요?
        </h4>

        <p className="body-4 mt-16 text-center text-gray-600">
          이 아이템을 구매하려면
          <br /> 도토리 {price}개가 필요해요.
        </p>

        <div className="mt-23 flex gap-8">
          <Button
            onClick={onClose}
            className="body-2 rounded-lg bg-moamoa-50 px-30 py-12 text-moamoa-600"
          >
            닫기
          </Button>
          <Button
            onClick={onConfirm}
            className="body-2 rounded-lg bg-moamoa-300 px-52 py-12 text-white"
          >
            구매하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
