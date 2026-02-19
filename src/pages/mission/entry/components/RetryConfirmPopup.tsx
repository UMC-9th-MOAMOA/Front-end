interface RetryConfirmPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function RetryConfirmPopup({
  onConfirm,
  onCancel,
}: RetryConfirmPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-48 w-full rounded-xl bg-white px-20 pt-28 pb-20">
        <h2 className="heading-3 text-center text-black">
          다시 풀 때는
          <br />
          도토리가 지급되지 않아요.
        </h2>
        <p className="body-2 mt-12 text-center text-gray-700">
          그래도 진행하시겠어요?
        </p>
        <div className="flex gap-12 pt-20">
          <button
            type="button"
            onClick={onCancel}
            className="body-2-1 flex-1 rounded-xl bg-moamoa-50 px-30 py-12 text-moamoa-600"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="body-2-1 flex-1 rounded-xl bg-moamoa-300 px-30 py-12 text-white"
          >
            다시 풀기
          </button>
        </div>
      </div>
    </div>
  );
}
