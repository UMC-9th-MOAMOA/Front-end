import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import type { AttendanceDay } from "./calendar.types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
  weeks: Date[][];
  currentMonth: number;
  markMap: Map<string, AttendanceDay>;
  selectedYMD: string;
  onSelectYMD: (ymd: string) => void;
  toYMD: (d: Date) => string;
};

export default function CalendarGrid({
  weeks,
  currentMonth,
  markMap,
  selectedYMD,
  onSelectYMD,
  toYMD,
}: Props) {
  return (
    <>
      <div className="detail-calendar mt-34 grid w-full grid-cols-7 text-center text-gray-500">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2">
            {w}
          </div>
        ))}
      </div>

      <div className="mt-17 flex w-full flex-col gap-8">
        {weeks.map((week, wi) => {
          const ranges: Array<{ start: number; end: number }> = [];
          let rangeStart: number | null = null;

          week.forEach((day, idx) => {
            const isCurrentMonth = day.getMonth() === currentMonth;
            const attended = Boolean(markMap.get(toYMD(day))?.attended);
            const active = isCurrentMonth && attended;

            if (active && rangeStart === null) rangeStart = idx;
            if (!active && rangeStart !== null) {
              ranges.push({ start: rangeStart, end: idx - 1 });
              rangeStart = null;
            }
          });

          if (rangeStart !== null) {
            ranges.push({ start: rangeStart, end: 6 });
          }

          return (
            <div key={wi} className="relative w-full">
              <div className="flex w-full">
                {week.map((d) => {
                  const ymd = toYMD(d);
                  const isSelected = ymd === selectedYMD;
                  const isCurrentMonth = d.getMonth() === currentMonth;

                  const mark = markMap.get(ymd);
                  const attended = Boolean(mark?.attended);
                  const hasAcorn = Boolean(mark?.hasAcorn);

                  return (
                    <div
                      key={ymd}
                      className={[
                        "flex w-full flex-1 flex-col items-center",
                        isCurrentMonth ? "cursor-pointer" : "",
                      ].join(" ")}
                      onClick={() => {
                        if (isCurrentMonth) onSelectYMD(ymd);
                      }}
                    >
                      {isCurrentMonth && (
                        <>
                          <div className="flex h-22 w-full items-center justify-center">
                            <button
                              type="button"
                              onClick={() => onSelectYMD(ymd)}
                              className={[
                                "detail-calendar flex h-22 w-full items-center justify-center",
                                isSelected
                                  ? "rounded-xl bg-[#5586F1] text-white"
                                  : "rounded-none text-gray-700",
                              ].join(" ")}
                              aria-label={`${ymd} 선택`}
                            >
                              {d.getDate()}
                            </button>
                          </div>

                          <div className="relative z-10 flex h-39 w-full items-center justify-center">
                            {attended && hasAcorn && (
                              <IcAcorn className="h-26 w-19 origin-center scale-[1.3] pt-5 text-amber-700" />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pointer-events-none absolute top-26 right-0 left-0 z-0 h-39">
                <div className="grid h-39 w-full grid-cols-7">
                  {ranges.map((range) => {
                    const isSingle = range.start === range.end;
                    const radiusClass = isSingle
                      ? "rounded-xl"
                      : "rounded-full";

                    return (
                      <div
                        key={`${range.start}-${range.end}`}
                        style={{
                          gridColumn: `${range.start + 1} / ${range.end + 2}`,
                        }}
                        className="flex h-39 items-center"
                      >
                        <div
                          className={[
                            "h-32 w-full border border-moamoa-300 border-dashed bg-moamoa-50",
                            radiusClass,
                          ].join(" ")}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
