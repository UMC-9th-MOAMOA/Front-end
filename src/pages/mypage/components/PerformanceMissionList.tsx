import { useNavigate } from "react-router-dom";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcAttendance from "@/assets/icons/ic_attendance.svg?react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import IcMinus from "@/assets/icons/ic_minus.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";

type RowKind =
  | "attendance"
  | "attendanceStreakBonus"
  | "dailyReward"
  | "weeklyReward"
  | "mission";

const GRID_COLS_HEADER = "grid-cols-[1fr_64px_41px_28px_24px]";
const GRID_COLS_ROW = "grid-cols-[1fr_64px_max-content_20px_24px]";

export type PerformanceMissionRow = {
  rowId: string;
  missionId?: number | null;
  kind: RowKind;
  title: string;
  acornDelta: number;
  durationMin: number | null;
};

type AcornDeltaProps = {
  value: number;
  className?: string;
  textClassName?: string;
};

function AcornDelta({ value, className, textClassName }: AcornDeltaProps) {
  const isNegative = value < 0;
  return (
    <div className={["flex items-center", className].filter(Boolean).join(" ")}>
      {isNegative ? (
        <IcMinus className="h-16 w-16" aria-hidden />
      ) : (
        <IcPlus className="h-16 w-16" aria-hidden />
      )}
      <span className={textClassName}>{Math.abs(value)}</span>
      <IcAcorn className="h-29 w-21" aria-hidden />
    </div>
  );
}

export default function PerformanceMissionList({
  rows,
}: {
  rows: PerformanceMissionRow[];
}) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-full px-10 text-black">
        <div
          className={["grid w-full items-center", GRID_COLS_HEADER].join(" ")}
        >
          <span className="heading-6">미션 이름</span>
          <span className="heading-6 justify-self-start">시간</span>
          <span className="heading-6 justify-self-start whitespace-nowrap">
            도토리
          </span>
          <span aria-hidden />
          <span aria-hidden />
        </div>
      </div>

      <div className="my-8 h-2 w-full bg-moamoa-50" />

      <ul className="w-full divide-y divide-gray-100">
        {rows
          .filter((row) => row.kind === "mission")
          .map((row) => (
            <li key={row.rowId} className="w-full">
              <div className="flex h-56 w-full flex-col items-center justify-center px-10">
                <div className="w-full">
                  <div
                    className={[
                      "grid h-40 w-full items-center",
                      GRID_COLS_ROW,
                    ].join(" ")}
                  >
                    <div className="flex h-25 min-w-0 items-center text-black">
                      <span className="body-2 truncate">{row.title}</span>
                    </div>

                    <span className="body-4 mr-20 justify-self-center text-black">
                      {row.durationMin != null ? `${row.durationMin}분` : ""}
                    </span>

                    <AcornDelta
                      value={row.acornDelta}
                      className="gap-2 justify-self-end"
                      textClassName="body-2 text-black"
                    />

                    <span aria-hidden />

                    <button
                      type="button"
                      onClick={() => {
                        if (
                          row.missionId != null &&
                          Number.isFinite(row.missionId)
                        ) {
                          navigate(`/mypage/mission/${row.missionId}`);
                        }
                      }}
                      className="justify-self-end"
                      aria-label="View mission detail"
                    >
                      <IcDropdown
                        className="h-24 w-24 -rotate-90 text-gray-700"
                        aria-hidden
                      />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}

        {rows
          .filter((row) => row.kind !== "mission")
          .map((row) => (
            <li key={row.rowId} className="w-full">
              <div className="flex h-56 w-full flex-col items-center justify-center px-10">
                <div className="flex w-full items-center gap-2">
                  <IcAttendance className="h-24 w-24 shrink-0" aria-hidden />

                  <div className="flex h-25 items-center text-black">
                    <span className="body-2">
                      {row.kind === "attendance"
                        ? "출석"
                        : row.kind === "attendanceStreakBonus"
                          ? "연속 출석"
                          : row.kind === "dailyReward"
                            ? "일일 보상"
                            : "주간 보상"}
                    </span>
                  </div>

                  <AcornDelta
                    value={row.acornDelta}
                    className="ml-auto gap-4"
                    textClassName="body-2 text-black"
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>

      <div className="mt-13 h-2 w-full bg-moamoa-100" />
    </div>
  );
}
