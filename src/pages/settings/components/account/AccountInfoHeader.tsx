import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";
import IcProfile2 from "@/assets/icons/profile/ic_profile2.svg?react";
import IcProfile3 from "@/assets/icons/profile/ic_profile3.svg?react";

export default function AccountInfoHeader() {
  return (
    <>
      {/* Header 아래 간격 14 */}
      <div className="h-14" />

      {/* 구분선 393 x 2 */}
      <div className="h-2 w-full bg-[var(--color-gray-200)]" />

      {/* 구분선 아래 간격 53 */}
      <div className="h-53" />

      {/* 메인 프로필 아이콘 (164 x 164) */}
      <IcProfile2 className="h-164 w-164" aria-hidden />

      {/* 아이콘 아래 간격 30 */}
      <div className="h-30" />

      {/* 프로필 선택 박스 (325 x 115) */}
      <div className="flex h-115 w-full flex-col items-center justify-center gap-4 rounded-lg bg-[var(--color-gray-100)] p-12">
        {/* 내부 row */}
        <div className="flex w-full items-center justify-center gap-12 self-stretch">
          <IcProfile3 className="h-91 w-91" aria-hidden />
          <IcProfile2 className="h-91 w-91" aria-hidden />
          <IcProfile1 className="h-91 w-91" aria-hidden />
        </div>
      </div>

      {/* 박스 아래 간격 43 */}
      <div className="h-43" />
    </>
  );
}
