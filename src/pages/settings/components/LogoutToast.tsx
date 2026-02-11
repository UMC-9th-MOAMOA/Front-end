import IcCheck from "@/assets/icons/ic_check.svg?react";

interface LogoutToastProps {
  show: boolean;
}

export default function LogoutToast({ show }: LogoutToastProps) {
  if (!show) return null;

  return (
    <div
      className="fixed right-0 left-0 z-50 flex justify-center"
      style={{ bottom: "110px" }}
    >
      <output
        aria-live="polite"
        className="flex items-center gap-12 rounded-full bg-[#5D72A2] px-20 py-12"
      >
        <IcCheck className="h-24 w-24 shrink-0 text-white" />
        <p className="body-4 text-white">로그아웃 되었습니다.</p>
      </output>
    </div>
  );
}
