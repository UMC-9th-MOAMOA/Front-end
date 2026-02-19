// EmailDomainSelect.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import IcDropdownOpen from "@/assets/icons/auth/ic_dropdown.svg?react";
import IcDropdownClose from "@/assets/icons/auth/ic_dropdown_close.svg?react";
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
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [directValue, setDirectValue] = useState("");

  const displayOptions = useMemo(() => options.slice(0, 2), [options]);

  const hideIcon = Boolean(value) || isDirectInput;

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const handlePickDomain = (domain: string) => {
    setIsDirectInput(false);
    setDirectValue("");
    onChange(domain);
    setOpen(false);
  };

  const handlePickDirect = () => {
    setIsDirectInput(true);
    onChange("");
    setOpen(false);
  };

  const handleDirectChange = (v: string) => {
    setDirectValue(v);
    onChange(v);
  };

  const buttonText = isDirectInput
    ? directValue || "직접입력"
    : value || placeholder;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative inline-flex h-42 w-90 items-center gap-10 overflow-visible px-10 py-8",
        open ? "rounded-t-lg bg-gray-100" : "rounded-lg bg-gray-100",
        disabled && "opacity-50",
        className
      )}
    >
      {!open &&
        (isDirectInput ? (
          <input
            value={directValue}
            onChange={(e) => handleDirectChange(e.target.value)}
            disabled={disabled}
            placeholder="직접입력"
            className={cn(
              "body-4 w-full bg-transparent outline-none",
              !disabled && "focus:outline-1 focus:outline-moamoa-300",
              disabled ? "cursor-not-allowed text-gray-900" : "text-gray-900"
            )}
          />
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((p) => !p)}
            className={cn(
              "body-4 w-full bg-transparent text-left outline-none",
              disabled ? "cursor-not-allowed text-gray-900" : "cursor-pointer",
              value ? "text-gray-900" : "text-gray-500"
            )}
          >
            {buttonText}
          </button>
        ))}

      {!hideIcon &&
        (open ? (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer"
          >
            <IcDropdownClose />
          </button>
        ) : (
          <IcDropdownOpen className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2" />
        ))}

      {open && !disabled && !isDirectInput && (
        <div
          className={cn(
            "absolute top-full left-0 z-50 w-full overflow-hidden rounded-b-lg bg-gray-100 shadow-md",
            "max-h-122"
          )}
        >
          <ul>
            {displayOptions.map((op) => (
              <li key={op}>
                <button
                  type="button"
                  onClick={() => handlePickDomain(op)}
                  className="body-4 w-full px-10 py-4 text-left text-gray-900 hover:bg-black/5"
                >
                  {op}
                </button>
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={handlePickDirect}
                className="body-4 w-full px-10 py-8 text-left text-gray-900 hover:bg-black/5"
              >
                직접입력
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
