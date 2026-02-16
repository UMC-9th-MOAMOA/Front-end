import AcornIcon from "@/assets/icons/ic_acorn.svg?react";
import AcornDisabledIcon from "@/assets/icons/ic_acorn_disabled.svg?react";
import IcComplete from "@/assets/icons/home/attendance/ic_complete.svg?react";
import { cn } from "@/utils/cn/cn";

interface AttendanceCardProps {
  day: number;
  isActive: boolean;
}

export default function AttendanceCard({ day, isActive }: AttendanceCardProps) {
  const Icon = isActive ? AcornIcon : AcornDisabledIcon;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-4 rounded-xl px-20 py-8",
        isActive ? "bg-moamoa-50" : "bg-gray-200"
      )}
    >
      {isActive && (
        <IcComplete className="absolute -top-10 -right-10 z-10 size-31" />
      )}
      <span
        className={cn("body-5", isActive ? "text-moamoa-700" : "text-gray-600")}
      >
        {day}일
      </span>
      <Icon className="size-40" />
    </div>
  );
}
