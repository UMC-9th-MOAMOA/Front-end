import type { ButtonHTMLAttributes } from "react";

type Props = {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  labelId?: string;
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
        "flex shrink-0 items-center justify-center rounded-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-moamoa-400)] focus-visible:ring-offset-2",
      ].join(" ")}
      style={{
        width: 46,
        height: 20,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: on ? 4 : 3,
        paddingRight: on ? 3 : 4,
        backgroundColor: on ? "#2664ED" : "#BDBDBD",
      }}
      {...rest}
    >
      <span
        className="flex items-center"
        style={{ width: 39, height: 16, gap: on ? 8 : 5 }}
      >
        {on ? (
          <>
            <span
              className="detail-1"
              style={{ width: 15, height: 13, color: "#FFFFFF" }}
            >
              ON
            </span>
            <span
              aria-hidden
              className="shrink-0 rounded-full bg-white"
              style={{ width: 16, height: 16 }}
            />
          </>
        ) : (
          <>
            <span
              aria-hidden
              className="shrink-0 rounded-full bg-white"
              style={{ width: 16, height: 16 }}
            />
            <span className="detail-1 text-[var(--color-gray-600)]">OFF</span>
          </>
        )}
      </span>
    </button>
  );
}
