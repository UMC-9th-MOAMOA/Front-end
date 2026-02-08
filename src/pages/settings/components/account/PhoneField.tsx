import { Button } from "@/components/common/button/Button";

type Props = {
  value: string;
  isEditing: boolean;
  newValue: string;
  verifyCode: string;
  onStartEdit: () => void;
  onChangeNewValue: (value: string) => void;
  onChangeVerifyCode: (value: string) => void;
  onRequestVerification: () => void;
  onConfirm: () => void;
};

export default function PhoneField({
  value,
  isEditing,
  newValue,
  verifyCode,
  onStartEdit,
  onChangeNewValue,
  onChangeVerifyCode,
  onRequestVerification,
  onConfirm,
}: Props) {
  if (!isEditing) {
    return (
      <div className="flex w-full items-center gap-10 pb-130">
        <input
          value={value}
          disabled
          className="h-46 flex-1 rounded-lg bg-gray-100 px-15 py-8 text-black outline-none"
        />

        <Button
          type="button"
          onClick={onStartEdit}
          className="flex h-46 w-78 items-center justify-center rounded-lg bg-moamoa-50 px-15 py-8"
        >
          <span className="body-2 whitespace-nowrap text-moamoa-400">변경</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full items-center gap-10">
        <input
          value={newValue}
          onChange={(e) => onChangeNewValue(e.target.value)}
          className="h-46 flex-1 rounded-lg bg-gray-100 px-15 py-8 text-black outline-none"
          placeholder="-구분없이 입력"
        />

        <Button
          type="button"
          onClick={onRequestVerification}
          className="bgr-moamoa-50 flex h-46 w-78 items-center justify-center rounded-lg px-15 py-8"
        >
          <span className="body-2 whitespace-nowrap text-moamoa-400">
            인증번호
          </span>
        </Button>
      </div>

      <div className="flex w-full items-center gap-10 pb-74">
        <input
          value={verifyCode}
          onChange={(e) => onChangeVerifyCode(e.target.value)}
          className="h-46 flex-1 rounded-lg bg-gray-100 px-15 py-8 text-black outline-none"
          placeholder="인증번호 입력"
        />

        <Button
          type="button"
          onClick={onConfirm}
          className="flex h-46 w-78 items-center justify-center rounded-lg bg-moamoa-50 px-15 py-8"
        >
          <span className="body-2 whitespace-nowrap text-moamoa-400">확인</span>
        </Button>
      </div>
    </div>
  );
}
