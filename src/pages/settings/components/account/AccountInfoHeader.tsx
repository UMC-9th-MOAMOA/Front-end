import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";
import IcProfile2 from "@/assets/icons/profile/ic_profile2.svg?react";
import IcProfile3 from "@/assets/icons/profile/ic_profile3.svg?react";

export default function AccountInfoHeader() {
  return (
    <>
      <IcProfile2 className="mt-53 h-164 w-164" aria-hidden />

      <div className="mt-30 mb-43 flex h-115 w-full flex-col items-center justify-center gap-4 rounded-lg bg-[var(--color-gray-100)] p-12">
        <div className="flex w-full items-center justify-center gap-12 self-stretch">
          <IcProfile3 className="h-91 w-91" aria-hidden />
          <IcProfile2 className="h-91 w-91" aria-hidden />
          <IcProfile1 className="h-91 w-91" aria-hidden />
        </div>
      </div>
    </>
  );
}
