import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";
import IcProfile2 from "@/assets/icons/profile/ic_profile2.svg?react";
import IcProfile3 from "@/assets/icons/profile/ic_profile3.svg?react";

export default function AccountInfoHeader() {
  return (
    <>
      <div className="h-14" />

      <div className="h-2 w-full bg-[var(--color-gray-200)]" />

      <div className="h-53" />

      <IcProfile2 className="h-164 w-164" aria-hidden />

      <div className="h-30" />

      <div className="flex h-115 w-full flex-col items-center justify-center gap-4 rounded-lg bg-[var(--color-gray-100)] p-12">
        <div className="flex w-full items-center justify-center gap-12 self-stretch">
          <IcProfile3 className="h-91 w-91" aria-hidden />
          <IcProfile2 className="h-91 w-91" aria-hidden />
          <IcProfile1 className="h-91 w-91" aria-hidden />
        </div>
      </div>

      <div className="h-43" />
    </>
  );
}
