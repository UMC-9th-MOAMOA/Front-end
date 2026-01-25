import type { ReactNode } from "react";

type Props = {
  label: string;
  className?: string;
  children: ReactNode;
};

export default function FormField({ label, className, children }: Props) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-10 self-stretch ${className ?? ""}`}
    >
      <span className="body-2 whitespace-nowrap text-[var(--color-black)]">
        {label}
      </span>
      {children}
    </div>
  );
}
