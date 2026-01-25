import { useId, useMemo, useState } from "react";
import Header from "@/components/common/header/Header";
import MoaToggle from "@/pages/settings/components/common/Moatoggle";
import DurationPanel from "./targetMission/DurationPanel";
import MissionCountPanel from "./targetMission/MissionCountPanel";
import type { DurationKey, DurationOption } from "./targetMission/types";

const DURATION_OPTIONS: DurationOption[] = [
  { key: "keep", label: "계속 유지" },
  { key: "1w", label: "1주" },
  { key: "2w", label: "2주" },
  { key: "1m", label: "1개월" },
];

export default function TargetMissionCount() {
  const labelId = useId();
  const [isOn, setIsOn] = useState(true);
  const [dailyCount, setDailyCount] = useState<number>(5);
  const MIN_COUNT = 5;
  const [duration, setDuration] = useState<DurationKey>("keep");

  const panelBg = useMemo(
    () => (isOn ? "bg-[var(--color-moamoa-50)]" : "bg-[var(--color-gray-200)]"),
    [isOn]
  );
  const panelText = isOn ? "" : "text-[var(--color-black)]";

  const handleMinus = () =>
    setDailyCount((prev) => Math.max(MIN_COUNT, prev - 1));
  const handlePlus = () => setDailyCount((prev) => prev + 1);

  return (
    <div className="min-h-screen w-full bg-[var(--color-white)]">
      <Header title="목표 미션 개수 설정" property="common" />

      <div className="flex w-full flex-1 flex-col items-center">
        <div className="h-14" />
        <div className="h-2 w-full bg-[var(--color-gray-200)]" />
        <div className="h-28" />

        <p className="heading-3 whitespace-nowrap text-[var(--color-moamoa-400)]">
          나에게 맞는 속도로 조절해보세요.
        </p>

        <div className="h-20" />

        <div className="flex w-full flex-col items-center">
          <div className="flex w-full justify-end">
            <div className="flex items-start gap-16">
              <span
                id={labelId}
                className="body-4 whitespace-nowrap text-[var(--color-black)]"
              >
                목표 설정
              </span>

              <MoaToggle
                checked={isOn}
                onCheckedChange={setIsOn}
                labelId={labelId}
              />
            </div>
          </div>

          <div className="h-20" />

          <div className="flex w-full flex-col items-center">
            <MissionCountPanel
              panelBg={panelBg}
              panelText={panelText}
              isOn={isOn}
              dailyCount={dailyCount}
              onMinus={handleMinus}
              onPlus={handlePlus}
            />

            <div className="h-17" />

            <p
              className={[
                "body-4 w-full whitespace-nowrap text-center text-[var(--color-gray-900)]",
                panelText,
              ].join(" ")}
            >
              목표 달성 "최소 5개" 이상으로 설정해 주세요.
            </p>

            <div className="h-16" />
            <div className="h-2 w-full bg-[var(--color-gray-200)]" />
            <div className="h-20" />

            <DurationPanel
              panelBg={panelBg}
              isOn={isOn}
              duration={duration}
              options={DURATION_OPTIONS}
              onChange={setDuration}
            />

            <div className="h-31" />

            <p className="body-4 w-full text-center text-[var(--color-gray-700)]">
              목표를 달성할 수 있도록
              <br />
              꾸준히 실천해 주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
