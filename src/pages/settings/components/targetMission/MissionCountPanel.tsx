import IcMinus from "@/assets/icons/ic_minus.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";

type MissionCountPanelProps = {
  panelBg: string;
  panelText: string;
  isOn: boolean;
  dailyCount: number;
  onMinus: () => void;
  onPlus: () => void;
};

export default function MissionCountPanel({
  panelBg,
  panelText,
  isOn,
  dailyCount,
  onMinus,
  onPlus,
}: MissionCountPanelProps) {
  return (
    <section
      className={[
        "flex w-full flex-col items-center gap-23 rounded-lg px-0 pt-20 pb-28",
        panelBg,
      ].join(" ")}
    >
      <div
        className={[
          "heading-5 h-25 w-full whitespace-nowrap text-center text-black",
          panelText,
        ].join(" ")}
      >
        일간 미션
      </div>

      <div className="flex h-28 items-center gap-16">
        <button
          type="button"
          onClick={onMinus}
          className="inline-flex h-28 items-center justify-center whitespace-nowrap text-black"
          aria-label="일간 미션 감소"
          disabled={!isOn}
        >
          <IcMinus
            className={[
              "h-24 w-24",
              isOn
                ? "text-warning"
                : "text-black",
            ].join(" ")}
            aria-hidden
          />
        </button>

        <span
          className={[
            "heading-3 whitespace-nowrap text-black",
            panelText,
          ].join(" ")}
        >
          {dailyCount}
        </span>

        <button
          type="button"
          onClick={onPlus}
          className="inline-flex h-28 items-center justify-center whitespace-nowrap text-black"
          aria-label="일간 미션 증가"
          disabled={!isOn}
        >
          <IcPlus
            className={[
              "h-24 w-24",
              isOn
                ? "text-positive"
                : "text-black",
            ].join(" ")}
            aria-hidden
          />
        </button>
      </div>
    </section>
  );
}
