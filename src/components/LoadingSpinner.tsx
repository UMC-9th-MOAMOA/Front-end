import AcornIcon from "@/assets/icons/auth/onboarding/ic_acorn_onboarding.svg?react";
import { cn } from "@/utils/cn/cn";

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "relative flex size-28 shrink-0 items-center justify-center",
        className
      )}
      role="status"
      aria-label="로딩 중"
    >
      <svg
        className="absolute inset-0 size-full animate-spin"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="var(--color-gray-200)"
          strokeWidth="4"
        />

        <circle
          className="text-moamoa-300"
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="25 100"
        />
      </svg>

      <div className="flex size-[78%] items-center justify-center rounded-full bg-moamoa-300">
        <AcornIcon className="size-1/2 text-white" />
      </div>
    </div>
  );
}
