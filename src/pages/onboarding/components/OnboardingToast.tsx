import IcErred from "@/assets/icons/ic_erred.svg?react";
import { cn } from "@/utils/cn/cn";

interface OnboardingToastProps {
  message: string;
  className?: string;
}

export default function OnboardingToast({
  message,
  className,
}: OnboardingToastProps) {
  return (
    <output
      aria-live="polite"
      className={cn(
        "flex h-48 w-full items-center justify-center gap-16 rounded-lg bg-[#5D72A2] px-20 text-white",
        className
      )}
    >
      <IcErred className="h-24 w-24 shrink-0" />
      <p className="body-4 text-center leading-none">{message}</p>
    </output>
  );
}
