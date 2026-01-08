import { useMemo, useState } from "react";

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

          return (
            <div key={ymd} className="flex items-center justify-center">
              <div
                className={[
                  "relative flex h-9 w-9 items-center justify-center rounded-full text-sm",
                  isCurrentMonth ? "text-black" : "text-gray-300",
                  attended ? "bg-blue-100" : "",
                ].join(" ")}
              >
                {d.getDate()}

                {/* 도토리 표시(지금은 텍스트로. 나중에 아이콘 SVG로 교체) */}
                {hasAcorn && (
                  <span className="absolute right-0 -bottom-1 text-[10px]">
                    🌰
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
