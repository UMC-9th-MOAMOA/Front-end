import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcAd from "@/assets/icons/ic_ad.svg?react";
import IcAttendance from "@/assets/icons/ic_attendance.svg?react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";

type RowKind = "attendance" | "ad" | "mission";

export type PerformanceMissionRow = {
  rowId: string;
  kind: RowKind;
  title: string;
  acornDelta: number;
  durationMin: number | null;
};

export default function PerformanceMissionList({
  rows,
}: {
  rows: PerformanceMissionRow[];
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="heading-5 flex w-322 items-center gap-30 pl-10 text-[var(--color-black)]">
        <div className="flex w-94 shrink-0 items-center gap-4">
          <span>미션 이름</span>
        </div>

        {["시간", "도토리"].map((label) => (
          <div key={label} className="flex items-center justify-center">
            {label}
          </div>
        ))}
      </div>
      <div className="my-8 h-2 w-322 bg-[var(--color-moamoa-50)]" />
      {/* 미션 성과  */}
      <ul className="w-322 divide-y divide-[var(--color-gray-100)]">
        {rows.map((row) => {
          const isMission = row.kind === "mission";

          return (
            <li key={row.rowId} className="w-322">
              {/* 출석 / 광고 성과  */}
              {!isMission && (
                <div className="flex h-56 w-322 flex-col items-center justify-center self-stretch px-10">
                  <div className="flex w-full items-center">
                    {row.kind === "attendance" ? (
                      <IcAttendance
                        className="h-24 w-24 shrink-0"
                        aria-hidden
                      />
                    ) : (
                      <IcAd className="h-24 w-24 shrink-0" aria-hidden />
                    )}

                    <div className="w-6" />

                    <div className="flex h-25 w-106 shrink-0 items-center">
                      <span className="body-1 text-[var(--color-black)]">
                        {row.kind === "attendance" ? "출석" : "광고"}
                      </span>
                    </div>

                    <div className="w-103" />

                    <div className="flex shrink-0 items-center gap-4">
                      <IcPlus className="h-16 w-16" aria-hidden />

                      <span className="body-1 text-[var(--color-black)]">
                        {Math.abs(row.acornDelta)}
                      </span>

                      <IcAcorn className="h-40 w-29" aria-hidden />
                    </div>
                  </div>
                </div>
              )}

              {/* 미션 성과  */}
              {isMission && (
                <div className="flex h-56 w-322 flex-col items-center justify-center self-stretch px-10">
                  <div className="flex h-40 w-320 items-center gap-20 px-10">
                    <div className="flex h-25 w-106 shrink-0 items-center">
                      <span className="body-1 truncate text-[var(--color-black)]">
                        {row.title}
                      </span>
                    </div>

                    <div className="body-2 flex items-center text-[var(--color-black)]">
                      <span className="shrink-0">
                        {row.durationMin != null ? `${row.durationMin}분` : ""}
                      </span>

                      <div className="w-31" />

                      <div className="flex shrink-0 items-center gap-2">
                        <IcPlus className="h-16 w-16" aria-hidden />
                        <span>{Math.abs(row.acornDelta)}</span>
                        <IcAcorn className="h-40 w-29" aria-hidden />
                      </div>

                      <div className="w-28" />

                      <IcDropdown
                        className="h-24 w-24 shrink-0 -rotate-90 text-[var(--color-gray-700)]"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-13 h-2 w-322 bg-[var(--color-moamoa-100)]" />
    </div>
  );
}
