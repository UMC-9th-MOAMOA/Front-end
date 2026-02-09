import IcCheck from "@/assets/icons/ic_check.svg?react";

type Props = {
  onViewPolicy?: () => void;
  agreed?: boolean;
};

export default function InquiryConsentRow({ onViewPolicy, agreed = false }: Props) {
  return (
    <div className="flex w-full items-center justify-between pb-41">
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={onViewPolicy}
          className={[
            "flex h-16 w-16 items-center justify-center rounded-full p-1",
            agreed ? "bg-moamoa-50" : "bg-gray-400",
          ].join(" ")}
          aria-label="약관 전문 보기"
        >
          <IcCheck
            className={[
              "h-13 w-13",
              agreed ? "text-moamoa-400" : "text-white",
            ].join(" ")}
          />
        </button>
        <span className="body-4 text-center text-gray-600">
          (필수) 개인정보 수집・이용에 대한 안내
        </span>
      </div>
      <button
        type="button"
        className="body-4 whitespace-nowrap text-gray-800 underline"
        onClick={onViewPolicy}
      >
        전문보기
      </button>
    </div>
  );
}
