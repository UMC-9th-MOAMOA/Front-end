import { useId, useMemo, useState } from "react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import Header from "@/components/common/header/Header";
import MoaToggle from "@/pages/settings/components/common/Moatoggle";

type GoalToggle = "on" | "off";
type DurationKey = "keep" | "1w" | "2w" | "1m";

const DURATION_OPTIONS: Array<{ key: DurationKey; label: string }> = [
  { key: "keep", label: "계속유지" },
  { key: "1w", label: "1주" },
  { key: "2w", label: "2주" },
  { key: "1m", label: "한달" },
];

export default function TargetMissionCount() {
  const labelId = useId();
  const [isOn, setIsOn] = useState(true);
  const [goalToggle, setGoalToggle] = useState<GoalToggle>("on");
  const [dailyCount, setDailyCount] = useState<number>(1);
  const [duration, setDuration] = useState<DurationKey>("keep");

  const panelBg = useMemo(
    () =>
      goalToggle === "on"
        ? "bg-[var(--color-moamoa-50)]"
        : "bg-[var(--color-gray-200)]",
    [goalToggle]
  );

  const handleMinus = () => setDailyCount((prev) => Math.max(0, prev - 1));
  const handlePlus = () => setDailyCount((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-white">
      {/* TODO: 타이틀은 Figma 기준으로 변경 (예: '목표 미션 개수') */}
      <Header title="목표 미션 개수" property="common" />

      <div className="flex flex-col items-center">
        {/* Header 아래 간격 14 */}
        <div className="h-14" />

        {/* 구분선 */}
        <div className="h-2 w-393 bg-[var(--color-gray-200)]" />

        {/* 구분선 아래 간격 28 */}
        <div className="h-28" />

        {/* 문구 */}
        <p className="heading-4 whitespace-nowrap text-[var(--color-moamoa-400)]">
          나에게 맞는 속도로 조절해보세요
        </p>

        {/* 문구 아래 간격 20 */}
        <div style={{ height: 20 }} />

        {/* 본문 영역: 좌우 패딩 포함 */}
        <div className="w-full" style={{ paddingLeft: 18, paddingRight: 18 }}>
          {/* 목표 설정 ON/OFF 토글 */}
          <div className="flex justify-end">
            <div
              className="flex items-start"
              style={{ width: 113, height: 20, gap: 16 }}
            >
              <span
                id={labelId}
                className="heading-5 whitespace-nowrap text-[var(--color-black)]"
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

          {/* 토글 아래 간격 20 (필요하면 Figma 수치로 조절) */}
          <div style={{ height: 20 }} />

          {/* 박스들 */}
          <div className="flex flex-col items-center">
            {/* 박스 1: 일간 미션 */}
            <section
              className={["flex flex-col items-center px-0", panelBg].join(" ")}
              style={{
                height: 124,
                width: 325,
                gap: 23,
                borderRadius: 12,
                paddingTop: 20,
                paddingBottom: 28,
              }}
            >
              <div
                className="heading-5 whitespace-nowrap text-center text-[var(--color-black)]"
                style={{ height: 25, width: 66 }}
              >
                일간 미션
              </div>

              <div
                className="flex items-center"
                style={{ height: 28, width: 81.4, gap: 16 }}
              >
                <button
                  type="button"
                  onClick={handleMinus}
                  className="inline-flex items-center justify-center whitespace-nowrap text-[var(--color-black)]"
                  style={{ height: 28 }}
                  aria-label="일간 미션 감소"
                >
                  -
                </button>

                <span className="body-2-1 whitespace-nowrap text-[var(--color-black)]">
                  {dailyCount}
                </span>

                <button
                  type="button"
                  onClick={handlePlus}
                  className="inline-flex items-center justify-center whitespace-nowrap text-[var(--color-black)]"
                  style={{ height: 28 }}
                  aria-label="일간 미션 증가"
                >
                  +
                </button>
              </div>
            </section>

            {/* 박스1 아래 17 */}
            <div style={{ height: 17 }} />

            {/* 안내 문구 */}
            <p
              className="body-4 whitespace-nowrap text-[var(--color-gray-900)]"
              style={{ height: 18, width: 265 }}
            >
              주간 목표는 &quot;평일 5일&quot; 기준으로 자동 설정됩니다
            </p>

            {/* 문구 아래 16 */}
            <div style={{ height: 16 }} />

            {/* 구분선 */}
            <div
              className="bg-[var(--color-gray-200)]"
              style={{ height: 2, width: 324 }}
            />

            {/* 구분선 아래 20 */}
            <div style={{ height: 20 }} />

            {/* 박스 2: 유지 기간 (여기에도 panelBg 적용해서 “배경 없음” 해결) */}
            <section
              className={[
                "inline-flex flex-col items-start justify-center",
                panelBg,
              ].join(" ")}
              style={{
                height: 249,
                width: 324,
                gap: 23,
                borderRadius: 12,
                paddingLeft: 40,
                paddingRight: 40,
                paddingTop: 19,
                paddingBottom: 19,
              }}
            >
              <p className="heading-3 whitespace-nowrap text-[var(--color-moamoa-400)]">
                이 목표를 언제까지 유지할까요?
              </p>

              <div
                className="flex flex-col items-start"
                style={{ height: 160, width: 128, gap: 20 }}
              >
                {DURATION_OPTIONS.map((opt) => {
                  const selected = opt.key === duration;

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setDuration(opt.key)}
                      className={[
                        "body-4 whitespace-nowrap",
                        selected
                          ? "text-[var(--color-moamoa-400)]"
                          : "text-[var(--color-gray-700)]",
                      ].join(" ")}
                    >
                      <span
                        className="inline-flex items-center"
                        style={{ gap: 8 }}
                      >
                        <IcLeft
                          className={[
                            "rotate-180",
                            selected
                              ? "text-[var(--color-moamoa-400)]"
                              : "text-[var(--color-gray-400)]",
                          ].join(" ")}
                          style={{ height: 16, width: 16 }}
                          aria-hidden
                        />
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
