import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcAd from "@/assets/icons/ic_ad.svg?react";
import IcAttendance from "@/assets/icons/ic_attendance.svg?react";
import IcMissionBadge from "@/assets/icons/ic_details.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import type { PerformanceSummary } from "../types/mypage.type";

export default function PerformanceSection({
  data,
}: {
  data: PerformanceSummary;
}) {
  const rows = data.items.flatMap((item) =>
    item.missions.map((mission) => ({
      rowId: `${item.id}-${mission.id}`,
      kind: mission.kind,
      title: mission.title,
      acornDelta: mission.acornDelta,
      durationMin: mission.kind === "mission" ? item.durationMin : null,
      status: item.status,
    }))
  );

  const totalMin = rows.reduce((sum, r) => sum + (r.durationMin ?? 0), 0);
  const totalAcorn = rows.reduce((sum, r) => sum + r.acornDelta, 0);

  return (
    <section className="rounded-[16px] bg-white p-[24px] shadow-sm">
      <h2 className="text-center font-bold text-lg">{data.userName}의 성과</h2>
      {/* 헤더 row */}
      <div className="mt-[20.5px] flex h-[25px] w-[310px] items-center font-semibold text-gray-700 text-sm">
        <div className="flex h-[25px] w-[116px] items-center">미션 이름</div>

        <div className="w-[20px]" />

        <div className="flex h-[25px] w-[31px] items-center justify-center">
          시간
        </div>

        <div className="w-[20px]" />

        <div className="flex h-[25px] w-[46px] items-center justify-center">
          도토리
        </div>
      </div>

      <div className="my-[8px] h-[2px] w-[294px] bg-[#E3EBFD]" />

      {/* 목록 */}
      <ul className="divide-y divide-gray-100">
        {rows.map((row) => (
          <li key={row.rowId} className="py-3">
            <div className="flex h-[40px] w-[300px] items-center px-[10px] text-gray-700 text-sm">
              {/* 미션 이름 */}
              <div className="flex h-[25px] w-[116px] items-center gap-[4px] truncate">
                {row.kind === "attendance" && (
                  <IcAttendance className="h-[24px] w-[24px]" aria-hidden />
                )}
                {row.kind === "ad" && (
                  <IcAd className="h-[24px] w-[24px] p-[3px]" aria-hidden />
                )}
                <span className="truncate">{row.title}</span>
              </div>

              <div className="w-[20px]" />

              {/* 시간 */}
              <div className="flex h-[25px] w-[31px] items-center justify-center">
                {row.durationMin ? `${row.durationMin}분` : ""}
              </div>

              <div className="w-[20px]" />

              {/* 도토리 */}
              <div className="flex h-[25px] w-[46px] items-center justify-center gap-1">
                <IcPlus className="h-[16px] w-[16px]" aria-hidden />
                <span>{Math.abs(row.acornDelta)}</span>
                <IcAcorn className="h-[40px] w-[29px]" />
              </div>

              {/* 상태 (미션 row에만 보여주고 싶으면 조건 추가 가능) */}
              {row.kind === "mission" && (
                <div className="ml-auto">
                  <IcMissionBadge className="h-[24px] w-[24px]" aria-hidden />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-[13px] mb-[20px] h-[2px] w-[294px] bg-[#B4C9F9]" />

      {/* Total */}
      <div className="flex h-[28px] w-[272px] items-center font-semibold">
        <div className="flex h-[28px] w-[45px] items-center">Total</div>

        <div className="w-[70px]" />

        <div className="flex h-[28px] w-[22px] items-center justify-center">
          {totalMin}
        </div>
        <div className="flex h-[28px] w-[18px] items-center">분</div>

        <div className="w-[70px]" />

        <div className="flex h-[28px] w-[13px] items-center justify-center">
          <IcPlus className="h-[13px] w-[13px]" aria-hidden />
        </div>

        <div className="flex h-[28px] w-[10px] items-center justify-center">
          {Math.abs(totalAcorn)}
        </div>

        <IcAcorn className="h-[26px] w-[19px]" aria-hidden />
      </div>
    </section>
  );
}
