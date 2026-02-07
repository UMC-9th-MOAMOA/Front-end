import { useId } from "react";
import Header from "@/components/common/header/Header";
import MoaToggle from "@/pages/settings/components/common/Moatoggle";
import BottomActionBar from "./common/BottomActionBar";
import DurationPanel from "./targetMission/DurationPanel";
import MissionCountPanel from "./targetMission/MissionCountPanel";
import type { DurationOption } from "./targetMission/types";
import { useGoalSettings } from "./targetMission/hooks/useGoalSettings";

const DURATION_OPTIONS: DurationOption[] = [
  { key: "keep", label: "계속 유지" },
  { key: "1w", label: "1주" },
  { key: "2w", label: "2주" },
  { key: "1m", label: "1개월" },
];

export default function TargetMissionCount() {
  const labelId = useId();
  const {
    isOn,
    dailyCount,
    duration,
    panelBg,
    panelText,
    isDirty,
    isPending,
    handleMinus,
    handlePlus,
    handleToggle,
    handleDurationChange,
    handleSave,
  } = useGoalSettings();

  return (
    <div className="w-full bg-white">
      <Header title="목표 미션 개수 설정" property="common" />

      <div className="-mx-25 mt-14 h-2 bg-gray-200" />
      <div className="flex w-full flex-col items-center">
        <p className="heading-3 mt-28 whitespace-nowrap text-moamoa-400">
          취향에 맞는 형태로 조절해보세요.
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
                onCheckedChange={handleToggle}
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
              하루 목표치는 최대 5개로 설정할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="-mx-25 mt-16 h-2 bg-gray-200" />

      <div className="mt-20 flex w-full flex-1 flex-col items-center">
        <div className="w-full">
          <DurationPanel
            panelBg={panelBg}
            isOn={isOn}
            duration={duration}
            options={DURATION_OPTIONS}
            onChange={handleDurationChange}
          />
        </div>

        <p className="body-4 mt-31 w-full text-center text-gray-700">
          목표 기간은 변경한 다음날부터
          <br />
          적용됩니다.
        </p>
      </div>

      <BottomActionBar
        label={isPending ? "설정 중..." : "설정 저장하기"}
        onClick={handleSave}
        disabled={isPending || !isDirty}
      />
    </div>
  );
}
