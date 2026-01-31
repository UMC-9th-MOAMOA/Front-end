import { useId, useMemo, useState } from "react";
import Header from "@/components/common/header/Header";
import MoaToggle from "@/pages/settings/components/common/Moatoggle";
import BottomActionBar from "./common/BottomActionBar";
import DurationPanel from "./targetMission/DurationPanel";
import MissionCountPanel from "./targetMission/MissionCountPanel";
import type { DurationKey, DurationOption } from "./targetMission/types";

const DURATION_OPTIONS: DurationOption[] = [
  { key: "keep", label: "계속 유지" },
  { key: "1w", label: "1주" },
  { key: "2w", label: "2주" },
  { key: "1m", label: "한 달" },
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
  const panelText = isOn ? "" : "text-black";

  const handleMinus = () =>
    setDailyCount((prev) => Math.max(MIN_COUNT, prev - 1));
  const handlePlus = () => setDailyCount((prev) => prev + 1);

  return (
    <div className="min-h-screen w-full bg-[var(--color-white)] pb-98">
      <Header title="목표 미션 개수 설정" property="common" />

      <div className="flex w-full flex-1 flex-col items-center">
        <div className="mt-14 h-2 w-full bg-[var(--color-gray-200)]" />

        <p className="heading-3 mt-28 whitespace-nowrap text-moamoa-400">
          나에게 맞는 속도로 조절해보세요.
        </p>

        <div className="mt-20 flex w-full flex-col items-center">
          <div className="flex w-full justify-end">
            <div className="flex items-start gap-16">
              <span
                id={labelId}
                className="body-4 whitespace-nowrap text-black"
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

          <div className="mt-20 flex w-full flex-col items-center">
            <MissionCountPanel
              panelBg={panelBg}
              panelText={panelText}
              isOn={isOn}
              dailyCount={dailyCount}
              onMinus={handleMinus}
              onPlus={handlePlus}
            />

            <p
              className={[
                "body-4 mt-17 w-full whitespace-nowrap text-center text-gray-900",
                panelText,
              ].join(" ")}
            >
              주간 목표는 “평일 5일” 기준으로 자동 설정됩니다
            </p>

            <div className="mt-16 h-2 w-full bg-[var(--color-gray-200)]" />

            <div className="mt-20 w-full">
              <DurationPanel
                panelBg={panelBg}
                isOn={isOn}
                duration={duration}
                options={DURATION_OPTIONS}
                onChange={setDuration}
              />
            </div>

            <p className="body-4 mt-31 w-full text-center text-gray-700">
              주중에 변경한 목표는
              <br />그 다음주 부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>

      <BottomActionBar label="설정 저장하기" />
    </div>
  );
}
