// EmailDomainSelect.tsx
import IcDropdown from "@/assets/icons/auth/ic_dropdown.svg?react";
import { cn } from "@/utils/cn/cn";

type EmailDomainSelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function EmailDomainSelect({
  value,
  onChange,
  options,
  placeholder = "선택",
  disabled,
  className,
}: EmailDomainSelectProps) {
  return (
    <div
      className={cn(
        "relative inline-flex h-42 w-82 items-center gap-10 overflow-hidden rounded-lg bg-gray-100 px-10 py-8",
        disabled && "opacity-50",
        className
      )}
    >
      {/* select */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "body-4 w-full cursor-pointer appearance-none bg-transparent outline-none",
          disabled
            ? "cursor-not-allowed bg-gray-200 text-gray-900"
            : value
              ? "text-gray-900"
              : "text-gray-500"
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>

      <IcDropdown className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2" />
    </div>
  );
}
