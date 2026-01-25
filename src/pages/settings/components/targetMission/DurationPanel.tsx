import IcButtonCheck from "@/assets/icons/ic_buttoncheck.svg?react";
import { Button } from "@/components/common/button/Button";
import type { DurationKey, DurationOption } from "./types";

type DurationOptionButtonProps = {
  label: string;
  isOn: boolean;
  selected: boolean;
  onClick: () => void;
};

type DurationPanelProps = {
  panelBg: string;
  isOn: boolean;
  duration: DurationKey;
  options: DurationOption[];
  onChange: (value: DurationKey) => void;
};

function DurationOptionButton({
  label,
  isOn,
  selected,
  onClick,
}: DurationOptionButtonProps) {
  const isActive = isOn && selected;

  const handleClick = () => {
    if (!isOn) return;
    onClick();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="heading-5 self-start whitespace-nowrap text-center text-[var(--color-black)]"
    >
      <span className="inline-flex items-center gap-8">
        {isActive ? (
          <IcButtonCheck className="h-21 w-21" aria-hidden />
        ) : (
          <span
            className={[
              "flex items-center justify-center rounded-full border",
              isOn
                ? "border-[var(--color-moamoa-300)] bg-[var(--color-white)]"
                : "border-[var(--color-gray-600)] bg-[var(--color-gray-200)]",
            ].join(" ")}
            style={{ width: 21, height: 21 }}
            aria-hidden
          >
            <span
              className={[
                "rounded-full",
                isOn
                  ? "bg-[var(--color-moamoa-50)]"
                  : "bg-[var(--color-gray-400)]",
              ].join(" ")}
              style={{ width: 12.091, height: 12.091 }}
            />
          </span>
        )}
        {label}
      </span>
    </Button>
  );
}

export default function DurationPanel({
  panelBg,
  isOn,
  duration,
  options,
  onChange,
}: DurationPanelProps) {
  return (
    <section
      className={[
        "flex w-full flex-col items-start justify-center gap-23 rounded-lg pt-19 pr-41 pb-19 pl-40",
        panelBg,
      ].join(" ")}
    >
      <p
        className={[
          "heading-3 w-full whitespace-nowrap text-center",
          isOn ? "text-[var(--color-moamoa-400)]" : "text-[var(--color-black)]",
        ].join(" ")}
      >
        이 목표를 언제까지 유지할까요?
      </p>

      <div className="flex w-full flex-col items-start gap-20">
        {options.map((opt) => (
          <DurationOptionButton
            key={opt.key}
            label={opt.label}
            isOn={isOn}
            selected={opt.key === duration}
            onClick={() => onChange(opt.key)}
          />
        ))}
      </div>
    </section>
  );
}
