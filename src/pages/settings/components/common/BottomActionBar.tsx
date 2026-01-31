import type { ReactNode } from "react";
import { Button } from "@/components/common/button/Button";

type Props = {
  label: string;
  leftIcon?: ReactNode;
  onClick?: () => void;
};

export default function BottomActionBar({ label, leftIcon, onClick }: Props) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-20 bg-white">
      <div className="flex h-98 w-full items-center justify-center px-25 pt-8 pb-42">
        <Button
          type="button"
          onClick={onClick}
          leftIcon={leftIcon}
          className="heading-5 flex h-48 w-full items-center justify-center rounded-lg bg-[var(--color-moamoa-300)] text-white"
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
