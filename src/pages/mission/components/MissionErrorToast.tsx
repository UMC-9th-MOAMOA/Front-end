interface MissionErrorToastProps {
  message: string;
  onClose: () => void;
}

export default function MissionErrorToast({
  message,
  onClose,
}: MissionErrorToastProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-16 bg-white px-24">
      <p className="heading-6 text-gray-600">{message}</p>
      <button
        type="button"
        className="body-2 rounded-xl bg-moamoa-100 px-24 py-12 text-moamoa-500"
        onClick={onClose}
      >
        다시 시도
      </button>
    </div>
  );
}
