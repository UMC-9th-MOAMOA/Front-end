import IcCheck from "@/assets/icons/ic_check.svg?react";

export default function InquiryConsentRow() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gray-400)] p-1">
          <IcCheck className="h-13 w-13 text-[var(--color-white)]" />
        </div>
        <span className="body-4 text-center text-[var(--color-gray-600)]">
          (필수) 개인정보 수집·이용에 동의
        </span>
      </div>
      <button
        type="button"
        className="body-4 whitespace-nowrap text-[var(--color-gray-800)] underline"
      >
        전문보기
      </button>
    </div>
  );
}
