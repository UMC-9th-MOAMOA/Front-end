import type { ReactNode } from "react";
import { Button } from "@/components/common/button/Button";
import { cn } from "@/utils/cn/cn";

type Props = {
  label: string;
  leftIcon?: ReactNode;
  onClick?: () => void;
  buttonClassName?: string;
};

export default function BottomActionBar({
  label,
  leftIcon,
  onClick,
  buttonClassName,
}: Props) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-20 bg-[#FAFAFA] shadow-[0_-8px_50px_3px_rgba(0,0,0,0.10)]">
      <div className="flex h-98 w-full items-center justify-center px-25 pt-8 pb-[calc(42px+env(safe-area-inset-bottom))]">
        <Button
          type="button"
          onClick={onClick}
          leftIcon={leftIcon}
          className={cn(
            "heading-5 flex h-48 w-full items-center justify-center rounded-lg bg-moamoa-300 text-white",
            buttonClassName
          )}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
