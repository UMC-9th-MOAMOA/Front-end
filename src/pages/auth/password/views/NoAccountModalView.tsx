import { Button } from "@/components/common/button/Button";
import { Modal } from "../../components/Modal";

type NoAccountModalViewProps = {
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
  onSignup: () => void;
};

export function NoAccountModalView({
  open,
  onClose,
  onRetry,
  onSignup,
}: NoAccountModalViewProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="heading-3 text-center text-red-500">
        회원 정보를 찾을 수 없습니다
      </h2>

      <p className="body-2 mt-20 text-center text-gray-600">
        이메일 주소를 다시 확인하시거나,
        <br />
        회원가입을 진행해 주세요.
      </p>
      <div className="mt-32 flex justify-center gap-8">
        <Button
          type="button"
          onClick={onRetry}
          className="w-full bg-moamoa-50 py-12 text-moamoa-600 active:bg-moamoa-100"
        >
          다시 입력
        </Button>
        <Button
          type="button"
          onClick={onSignup}
          className="w-full bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
        >
          회원가입
        </Button>
      </div>
    </Modal>
  );
}
