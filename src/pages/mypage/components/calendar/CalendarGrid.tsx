import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcCalendarLeft from "@/assets/icons/ic_calendarleft.svg?react";
import IcCalendarMiddle from "@/assets/icons/ic_calendarmiddle.svg?react";
import IcCalendarRight from "@/assets/icons/ic_calendarright.svg?react";
import IcCalendarSolo from "@/assets/icons/ic_calendarsolo.svg?react";
import type { AttendanceDay } from "./calendar.types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
  weeks: Date[][];
  currentMonth: number;
  markMap: Map<string, AttendanceDay>;
  selectedYMD: string;
  onSelectYMD: (ymd: string) => void;
  toYMD: (d: Date) => string;
  addDays: (d: Date, days: number) => Date;
};

export default function CalendarGrid({
  weeks,
  currentMonth,
  markMap,
  selectedYMD,
  onSelectYMD,
  toYMD,
  addDays,
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
        {weeks.map((week, wi) => (
          <div key={wi} className="flex w-full">
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

              const pillBoxClass = isSingle ? "h-30 w-30" : "h-30 w-40";
              const seamFixClass = isSingle || isStart ? "" : "-ml-1";
              const alignClass = isSingle ? "justify-center" : "justify-start";

              const bgRadiusClass = isSingle
                ? "rounded-full"
                : isStart
                  ? "rounded-l-full"
                  : isEnd
                    ? "rounded-r-full"
                    : "rounded-none";

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
                              : "rounded-none text-[var(--color-gray-700)]",
                          ].join(" ")}
                          aria-label={`${ymd} 선택`}
                        >
                          {d.getDate()}
                        </button>
                      </div>

                      <div className="flex h-39 w-full items-center justify-center">
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
                                <IcAcorn className="relative h-26 w-19 text-amber-700" />
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="h-30 w-40" />
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
    </>
  );
}
