import { useMemo, useState } from "react";
import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import type { AttendanceDay } from "./calendar.types";

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

export default function Calendar({ marks = [] }: { marks?: AttendanceDay[] }) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedYMD, setSelectedYMD] = useState(() => toYMD(new Date()));

  function addMonths(date: Date, months: number) {
    return new Date(date.getFullYear(), date.getMonth() + months, 1);
  }

  const goPrevMonth = () =>
    setMonth((prev) => {
      const next = addMonths(prev, -1);
      setSelectedYMD(toYMD(next));
      return next;
    });

  const goNextMonth = () =>
    setMonth((prev) => {
      const next = addMonths(prev, 1);
      setSelectedYMD(toYMD(next));
      return next;
    });

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
    <section className="h-auto w-342 rounded-xl bg-white pt-16 pr-21 pb-16 pl-22 shadow-sm">
      <CalendarHeader month={month} onPrev={goPrevMonth} onNext={goNextMonth} />
      <CalendarGrid
        weeks={weeks}
        currentMonth={currentMonth}
        markMap={markMap}
        selectedYMD={selectedYMD}
        onSelectYMD={setSelectedYMD}
        toYMD={toYMD}
        addDays={addDays}
      />
    </section>
  );
}
