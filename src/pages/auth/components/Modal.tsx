type AuthModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export function Modal({ open, onClose, children }: AuthModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        aria-label="모달 닫기"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-10 w-300 rounded-xl bg-white px-20 pt-28 pb-20">
        {children}
      </div>
    </div>
  );
}
