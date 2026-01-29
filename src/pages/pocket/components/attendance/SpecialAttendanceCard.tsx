import Ic7Days from "@/assets/icons/ic_7days.svg?react";
import Ic7DaysDisabled from "@/assets/icons/ic_7days_disabled.svg?react";
import IcGoldAcorn from "@/assets/icons/ic_gold_acorn.svg?react";
import IcGoldAcornDisabled from "@/assets/icons/ic_gold_acorn_disabled.svg?react";

interface SpecialAttendanceCardProps {
  isActive: boolean;
}

export default function SpecialAttendanceCard({
  isActive,
}: SpecialAttendanceCardProps) {
  const GoldAcornIcon = isActive ? IcGoldAcorn : IcGoldAcornDisabled;
  const DaysIcon = isActive ? Ic7Days : Ic7DaysDisabled;

  return (
    <div
      className={`relative flex w-full items-center justify-between rounded-xl border-2 border-moamoa-400 px-12 py-8 ${
        isActive ? "bg-moamoa-50" : "bg-gray-200"
      }`}
    >
      <span
        className={`body-5 ${isActive ? "text-moamoa-700" : "text-gray-500"}`}
      >
        7일
      </span>
      <div className="flex flex-col items-center">
        <span
          className={`body-5 text-center ${isActive ? "text-moamoa-700" : "text-gray-500"}`}
        >
          보너스 도토리
        </span>
        <div className="mt-4 flex items-center">
          <GoldAcornIcon className="size-24" />
          <span
            className={`body-3 ml-4 ${isActive ? "text-moamoa-400" : "text-gray-500"}`}
          >
            +10개
          </span>
        </div>
      </div>
      <DaysIcon className="mr-11 size-98" />
    </div>
  );
}
