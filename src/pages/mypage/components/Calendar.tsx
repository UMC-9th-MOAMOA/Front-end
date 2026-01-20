import { useMemo, useState } from "react";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcCalendarLeft from "@/assets/icons/ic_calendarleft.svg?react";
import IcCalendarMiddle from "@/assets/icons/ic_calendarmiddle.svg?react";
import IcCalendarRight from "@/assets/icons/ic_calendarright.svg?react";
import IcCalendarSolo from "@/assets/icons/ic_calendarsolo.svg?react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";

type AttendanceDay = {
  date: string;
  attended?: boolean;
  hasAcorn?: boolean;
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

  const startPad = (start.getDay() + 6) % 7;
  const endPad = (7 - end.getDay()) % 7;

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
  const [month] = useState(() => new Date());
  const [selectedYMD, setSelectedYMD] = useState(() => toYMD(new Date()));

  const markMap = useMemo(() => {
    const m = new Map<string, AttendanceDay>();
    marks.forEach((x) => m.set(x.date, x));
    return m;
  }, [marks]);

  const grid = useMemo(() => getCalendarGrid(month), [month]);
  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < grid.length; i += 7) {
      result.push(grid.slice(i, i + 7));
    }
    return result;
  }, [grid]);

  const currentMonth = month.getMonth();

  return (
    <section className="h-[460px] w-[342px] rounded-[16px] bg-white p-5 shadow-sm">
      {/* 헤더 (드롭다운형 UI로 교체 예정) */}
      <div className="relative mb-[34px] h-[44px]">
        <div className="absolute top-[21px] right-[111px] left-[105px] flex items-center justify-center gap-[13px]">
          <span className="font-semibold text-sm">{month.getFullYear()}년</span>
          <span className="font-semibold text-sm">
            {month.getMonth() + 1}월
          </span>

          {/* 드롭다운 버튼(기능은 나중) */}
          <button type="button" aria-label="월 선택 열기">
            <IcDropdown className="h-[7px] w-[13px]" />
          </button>
        </div>
      </div>

      {/* 요일 */}
      <div className="mx-auto grid w-[280px] grid-cols-7 text-center text-gray-500 text-xs">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2">
            {w}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 (week 단위) */}
      <div className="mt-[17px] flex flex-col items-center gap-[8px]">
        {weeks.map((week, wi) => (
          // 1주 박스: 280x61
          <div key={wi} className="flex h-[61px] w-[280px]">
            {week.map((d) => {
              const ymd = toYMD(d);
              const isSelected = ymd === selectedYMD;

              const isCurrentMonth = d.getMonth() === currentMonth;

              const mark = markMap.get(ymd);
              const attended = Boolean(mark?.attended);
              const hasAcorn = Boolean(mark?.hasAcorn);

              const prev = addDays(d, -1);
              const next = addDays(d, 1);
              const prevAttended = Boolean(markMap.get(toYMD(prev))?.attended);
              const nextAttended = Boolean(markMap.get(toYMD(next))?.attended);

              const isSingle = attended && !prevAttended && !nextAttended;
              const isStart = attended && !prevAttended && nextAttended;
              const isEnd = attended && prevAttended && !nextAttended;

              const Outline = isSingle
                ? IcCalendarSolo
                : isStart
                  ? IcCalendarLeft
                  : isEnd
                    ? IcCalendarRight
                    : IcCalendarMiddle;

              const pillBoxClass = isSingle
                ? "h-[30px] w-[30px]"
                : "h-[30px] w-[40px]";
              const seamFixClass = isSingle || isStart ? "" : "ml-[-1px]";
              const alignClass = isSingle ? "justify-center" : "justify-start";

              const bgRadiusClass = isSingle
                ? "rounded-full"
                : isStart
                  ? "rounded-l-full"
                  : isEnd
                    ? "rounded-r-full"
                    : "rounded-none";

              return (
                // 요일 1칸: 40x61
                <div
                  key={ymd}
                  className="flex h-[61px] w-[40px] flex-col items-center"
                >
                  {isCurrentMonth && (
                    <>
                      {/* 날짜: 22px */}
                      <div className="flex h-[22px] items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setSelectedYMD(ymd)}
                          className={[
                            "flex h-[22px] w-[36px] items-center justify-center text-sm",
                            isSelected
                              ? "rounded-[20px] bg-[#5586F1] text-white"
                              : "rounded-none text-[#9E9E9E]",
                          ].join(" ")}
                          aria-label={`${ymd} 선택`}
                        >
                          {d.getDate()}
                        </button>
                      </div>

                      {/* pill: 39px */}
                      <div className="flex h-[39px] w-full items-center justify-center">
                        {attended ? (
                          <div
                            className={[
                              "flex w-full items-center",
                              alignClass,
                            ].join(" ")}
                          >
                            <div
                              className={[
                                "relative flex items-center justify-center",
                                pillBoxClass,
                                seamFixClass,
                              ].join(" ")}
                            >
                              <div
                                className={[
                                  "absolute inset-0 bg-blue-100",
                                  bgRadiusClass,
                                ].join(" ")}
                              />

                              <Outline
                                className="absolute inset-0 h-full w-full"
                                aria-hidden
                              />

                              {hasAcorn && (
                                <IcAcorn className="relative h-[26px] w-[19px] text-amber-700" />
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="h-[30px] w-[40px]" />
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
