import { useId, useMemo, useState } from "react";
import IcMinus from "@/assets/icons/ic_minus.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import { Button } from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import MoaToggle from "@/pages/settings/components/common/Moatoggle";

type GoalToggle = "on" | "off";
type DurationKey = "keep" | "1w" | "2w" | "1m";

const DURATION_OPTIONS: Array<{ key: DurationKey; label: string }> = [
  { key: "keep", label: "계속 유지" },
  { key: "1w", label: "1주" },
  { key: "2w", label: "2주" },
  { key: "1m", label: "한 달" },
];

export default function TargetMissionCount() {
  const labelId = useId();
  const [isOn, setIsOn] = useState(true);
  const [dailyCount, setDailyCount] = useState<number>(1);
  const [duration, setDuration] = useState<DurationKey>("keep");

  const panelBg = useMemo(
    () => (isOn ? "bg-[var(--color-moamoa-50)]" : "bg-[var(--color-gray-200)]"),
    [isOn]
  );
  const panelText = isOn ? "" : "text-[var(--color-black)]";

  const handleMinus = () => setDailyCount((prev) => Math.max(0, prev - 1));
  const handlePlus = () => setDailyCount((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-white">
      {/* TODO: 타이틀은 Figma 기준으로 변경 (예: '목표 미션 개수') */}
      <Header title="목표 미션 개수 설정" property="common" />

      <div className="flex flex-col items-center">
        {/* Header 아래 간격 14 */}
        <div className="h-14" />

        {/* 구분선 */}
        <div className="h-2 w-393 bg-[var(--color-gray-200)]" />

        {/* 구분선 아래 간격 28 */}
        <div className="h-28" />

        {/* 문구 */}
        <p className="heading-3 whitespace-nowrap text-[var(--color-moamoa-400)]">
          나에게 맞는 속도로 조절해보세요.
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
                className={[
                  "heading-5 whitespace-nowrap text-center text-[var(--color-black)]",
                  panelText,
                ].join(" ")}
                style={{ height: 25, width: 66 }}
              >
                일간 미션
              </div>

              <div
                className="flex items-center"
                style={{ height: 28, gap: 16 }}
              >
                <button
                  type="button"
                  onClick={handleMinus}
                  className="inline-flex items-center justify-center whitespace-nowrap text-[var(--color-black)]"
                  style={{ height: 28 }}
                  aria-label="일간 미션 감소"
                >
                  <IcMinus
                    className={[
                      "h-24 w-24",
                      isOn
                        ? "text-[var(--color-warning)]"
                        : "text-[var(--color-black)]",
                    ].join(" ")}
                    aria-hidden
                  />
                </button>

                <span
                  className={[
                    "heading-3 whitespace-nowrap text-[var(--color-black)]",
                    panelText,
                  ].join(" ")}
                >
                  {dailyCount}
                </span>

                <button
                  type="button"
                  onClick={handlePlus}
                  className="inline-flex items-center justify-center whitespace-nowrap text-[var(--color-black)]"
                  style={{ height: 28 }}
                  aria-label="일간 미션 증가"
                >
                  <IcPlus
                    className={[
                      "h-24 w-24",
                      isOn
                        ? "text-[var(--color-positive)]"
                        : "text-[var(--color-black)]",
                    ].join(" ")}
                    aria-hidden
                  />
                </button>
              </div>
            </section>

            {/* 박스1 아래 17 */}
            <div style={{ height: 17 }} />

            {/* 안내 문구 */}
            <p
              className={[
                "body-4 whitespace-nowrap text-[var(--color-gray-900)]",
                panelText,
              ].join(" ")}
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
              <p
                className={[
                  "heading-3 whitespace-nowrap",
                  isOn
                    ? "text-[var(--color-moamoa-400)]"
                    : "text-[var(--color-black)]",
                ].join(" ")}
              >
                이 목표를 언제까지 유지할까요?
              </p>

              <div
                className="flex flex-col items-start"
                style={{ height: 160, width: 128, gap: 20 }}
              >
                {DURATION_OPTIONS.map((opt) => {
                  const selected = opt.key === duration;

                  return (
                    <Button
                      key={opt.key}
                      type="button"
                      onClick={() => setDuration(opt.key)}
                      className={[
                        "heading-5 whitespace-nowrap text-[var(--color-black)]",
                        isOn
                          ? selected
                            ? "text-[var(--color-moamoa-400)]"
                            : "text-[var(--color-gray-700)]"
                          : "text-[var(--color-black)]",
                      ].join(" ")}
                    >
                      <span
                        className="inline-flex items-center"
                        style={{ gap: 8 }}
                      >
                        <span
                          className="flex items-center justify-center border bg-white"
                          style={{
                            width: 24,
                            height: 24,
                            padding: 1.5,
                            gap: 6,
                            borderRadius: 22.5,
                            borderColor: "#2664ED",
                          }}
                          aria-hidden
                        >
                          <span
                            className="shrink-0"
                            style={{
                              width: 11,
                              height: 11,
                              borderRadius: 100,
                              backgroundColor: "#E3EBFD",
                            }}
                          />
                        </span>
                        {opt.label}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </section>

            <div style={{ height: 31 }} />

            <p
              className="body-4 text-center text-[var(--color-gray-700)]"
              style={{ width: 144, height: 36 }}
            >
              주중에 변경한 목표는
              <br />그 다음주부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
