import { useMemo, useState } from "react";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";

const DASH_COLOR = "#5586F1";
const DASH_W = "1.5px";

type AttendanceDay = {
  date: string; // "2026-01-07"
  attended?: boolean;
  hasAcorn?: boolean; // 미션 성공일 표시용(나중에 도토리 아이콘)
};

function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getCalendarGrid(month: Date) {
  const start = startOfMonth(month);
  const end = endOfMonth(month);

  // 일(0)~토(6). 달력은 일요일 시작으로 가정
  const startPad = start.getDay();
  const endPad = 6 - end.getDay();

  const gridStart = addDays(start, -startPad);
  const gridEnd = addDays(end, endPad);

  const days: Date[] = [];
  for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) {
    days.push(new Date(d));
  }
  return days;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar({ marks = [] }: { marks?: AttendanceDay[] }) {
  // 이번 달 기본값
  const [month, setMonth] = useState(() => new Date());

  const markMap = useMemo(() => {
    const m = new Map<string, AttendanceDay>();
    marks.forEach((x) => m.set(x.date, x));
    return m;
  }, [marks]);

  const grid = useMemo(() => getCalendarGrid(month), [month]);

  const currentMonth = month.getMonth();
  const monthLabel = `${month.getFullYear()}년 ${month.getMonth() + 1}월`;

  const prevMonth = () =>
    setMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () =>
    setMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
      {/* 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={prevMonth} className="px-2 py-1 text-sm">
          {"<"}
        </button>
        <div className="font-semibold text-sm">{monthLabel}</div>
        <button type="button" onClick={nextMonth} className="px-2 py-1 text-sm">
          {">"}
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-xs">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2">
            {w}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {grid.map((d) => {
          const ymd = toYMD(d);
          const isCurrentMonth = d.getMonth() === currentMonth;

          const mark = markMap.get(ymd);
          const attended = Boolean(mark?.attended);
          const hasAcorn = Boolean(mark?.hasAcorn);

          // 연속 출석 판별 (앞/뒤 날짜 출석 여부)
          const prev = addDays(d, -1);
          const next = addDays(d, 1);
          const prevAttended = Boolean(markMap.get(toYMD(prev))?.attended);
          const nextAttended = Boolean(markMap.get(toYMD(next))?.attended);

          const isSingle = attended && !prevAttended && !nextAttended;
          const isStart = attended && !prevAttended && nextAttended;
          const isMiddle = attended && prevAttended && nextAttended;
          const isEnd = attended && prevAttended && !nextAttended;

          // pill 클래스 결정
          const pillClass = (() => {
            if (!attended) return "h-8 w-8";

            if (isSingle) return "h-8 w-8 rounded-full bg-blue-100";
            if (isStart) return "h-8 w-10 rounded-l-full bg-blue-100";
            if (isMiddle) return "h-8 w-10 rounded-none bg-blue-100";
            if (isEnd) return "h-8 w-10 rounded-r-full bg-blue-100";

            return "h-8 w-8 rounded-full bg-blue-100";
          })();

          return (
            <div key={ymd} className="flex items-center justify-center">
              {/* 2단 구조: 날짜(위) + 출석 pill(아래) */}
              <div className="flex flex-col items-center">
                {/* 날짜 숫자 */}
                <div
                  className={[
                    "text-sm",
                    isCurrentMonth ? "text-black" : "text-gray-300",
                  ].join(" ")}
                >
                  {d.getDate()}
                </div>

                {/* pill 영역: mt-1로 아래 여백 */}
                <div className="mt-1 flex h-8 w-10 items-center justify-center">
                  {attended ? (
                    <div
                      className={[
                        "relative flex items-center justify-center overflow-hidden",
                        pillClass,
                      ].join(" ")}
                    >
                      {/* ===== 점선 외곽선 레이어 (내부 분할선 없음) ===== */}
                      {isSingle ? (
                        <div
                          className="pointer-events-none absolute inset-0 rounded-full border-dashed"
                          style={{
                            borderColor: DASH_COLOR,
                            borderWidth: DASH_W,
                          }}
                        />
                      ) : (
                        <div className="pointer-events-none absolute inset-0">
                          {/* Middle 포함: 위/아래 (=) */}
                          <div
                            className="absolute top-0 right-0 left-0 border-t border-dashed"
                            style={{
                              borderTopColor: DASH_COLOR,
                              borderTopWidth: DASH_W,
                            }}
                          />
                          <div
                            className="absolute right-0 bottom-0 left-0 border-b border-dashed"
                            style={{
                              borderBottomColor: DASH_COLOR,
                              borderBottomWidth: DASH_W,
                            }}
                          />

                          {/* Start: 왼쪽 세로 + 코너 보정 */}
                          {isStart && (
                            <>
                              <div
                                className="absolute top-0 bottom-0 left-0 border-l border-dashed"
                                style={{
                                  borderLeftColor: DASH_COLOR,
                                  borderLeftWidth: DASH_W,
                                }}
                              />
                              <div
                                className="absolute top-0 left-0 h-4 w-4 rounded-tl-full border-dashed"
                                style={{
                                  borderLeftColor: DASH_COLOR,
                                  borderTopColor: DASH_COLOR,
                                  borderLeftWidth: DASH_W,
                                  borderTopWidth: DASH_W,
                                }}
                              />
                              <div
                                className="absolute bottom-0 left-0 h-4 w-4 rounded-bl-full border-dashed"
                                style={{
                                  borderLeftColor: DASH_COLOR,
                                  borderBottomColor: DASH_COLOR,
                                  borderLeftWidth: DASH_W,
                                  borderBottomWidth: DASH_W,
                                }}
                              />
                            </>
                          )}

                          {/* End: 오른쪽 세로 + 코너 보정 */}
                          {isEnd && (
                            <>
                              <div
                                className="absolute top-0 right-0 bottom-0 border-r border-dashed"
                                style={{
                                  borderRightColor: DASH_COLOR,
                                  borderRightWidth: DASH_W,
                                }}
                              />
                              <div
                                className="absolute top-0 right-0 h-4 w-4 rounded-tr-full border-dashed"
                                style={{
                                  borderRightColor: DASH_COLOR,
                                  borderTopColor: DASH_COLOR,
                                  borderRightWidth: DASH_W,
                                  borderTopWidth: DASH_W,
                                }}
                              />
                              <div
                                className="absolute right-0 bottom-0 h-4 w-4 rounded-br-full border-dashed"
                                style={{
                                  borderRightColor: DASH_COLOR,
                                  borderBottomColor: DASH_COLOR,
                                  borderRightWidth: DASH_W,
                                  borderBottomWidth: DASH_W,
                                }}
                              />
                            </>
                          )}
                        </div>
                      )}

                      {/* 도토리 */}
                      {hasAcorn && (
                        <IcAcorn className="h-4 w-4 text-amber-700" />
                      )}
                    </div>
                  ) : (
                    <div className="h-8 w-8" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
