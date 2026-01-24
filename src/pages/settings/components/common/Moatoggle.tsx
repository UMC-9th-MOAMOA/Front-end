import type { ButtonHTMLAttributes } from "react";

type Props = {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  labelId?: string; // "?? ??" ???? ???
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export default function MoaToggle({
  checked,
  onCheckedChange,
  labelId,
  ...rest
}: Props) {
  const on = checked;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-labelledby={labelId}
      onClick={() => onCheckedChange(!on)}
      className={[
        "flex items-start text-[var(--color-gray-900)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-moamoa-400)] focus-visible:ring-offset-2",
      ].join(" ")}
      {...rest}
    >
      {on ? (
        <>
          <span className="body-4">on</span>
          <span
            aria-hidden
            className="shrink-0 rounded-full bg-[var(--color-gray-900)]"
            style={{ width: 16, height: 16 }}
          />
        </>
      ) : (
        <>
          <span
            aria-hidden
            className="shrink-0 rounded-full bg-[var(--color-gray-900)]"
            style={{ width: 16, height: 16 }}
          />
          <span className="body-4">off</span>
        </>
      )}
    </button>
  );
}
