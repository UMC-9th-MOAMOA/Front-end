import { Button } from "@/components/common/button/Button";
import type { Gender } from "../../types/settings.type";

type Props = {
  value: Gender;
  onChange: (value: Gender) => void;
};

export default function GenderToggleField({ value, onChange }: Props) {
  return (
    <div className="relative flex h-46 w-full items-center justify-end rounded-lg bg-[var(--color-moamoa-50)] px-0 py-8">
      <div
        className={[
          "absolute top-0 h-46 w-1/2 rounded-lg bg-[var(--color-moamoa-200)] transition-transform",
          value === "남자" ? "left-0" : "right-0",
        ].join(" ")}
      />

      <div className="relative z-10 flex w-full">
        <Button
          type="button"
          onClick={() => onChange("남자")}
          className={[
            "body-2 flex h-46 w-1/2 items-center justify-center whitespace-nowrap px-15 text-center",
            value === "남자"
              ? "text-[var(--color-white)]"
              : "text-[var(--color-moamoa-400)]",
          ].join(" ")}
        >
          남자
        </Button>

        <Button
          type="button"
          onClick={() => onChange("여자")}
          className={[
            "body-2 flex h-46 w-1/2 items-center justify-center whitespace-nowrap px-15 text-center",
            value === "여자"
              ? "text-[var(--color-white)]"
              : "text-[var(--color-moamoa-400)]",
          ].join(" ")}
        >
          여자
        </Button>
      </div>
    </div>
  );
}
