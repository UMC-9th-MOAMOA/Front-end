import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import type { PerformanceSummary } from "../types/mypage.type";
import PerformanceMissionList, {
  type PerformanceMissionRow,
} from "./PerformanceMissionList";

export default function PerformanceSection({
  data,
}: {
  data: PerformanceSummary;
}) {
  const rows: PerformanceMissionRow[] = data.items.flatMap((item) =>
    item.missions.map((mission) => ({
      rowId: `${item.id}-${mission.id}`,
      kind: mission.kind,
      title: mission.title,
      acornDelta: mission.acornDelta,
      durationMin: mission.kind === "mission" ? item.durationMin : null,
    }))
  );

  const totalMin = rows.reduce((sum, r) => sum + (r.durationMin ?? 0), 0);
  const totalAcorn = rows.reduce((sum, r) => sum + r.acornDelta, 0);

  return (
    <section className="flex w-full flex-col rounded-xl bg-white px-10 py-28 shadow-sm">
      <div className="flex w-full flex-col items-center gap-20">
        <div className="flex w-full flex-col items-center gap-10">
          <h2 className="heading-2 text-center text-black">
            {data.userName}의 성과
          </h2>
        </div>

        <div className="flex w-full flex-1">
          <PerformanceMissionList rows={rows} />
        </div>

        <div className="w-full text-black">
          <div className="heading-3 flex h-28 w-full min-w-[273px] items-center px-[24.5px]">
            <span className="h-28 w-45">Total</span>
            <span className="min-w-[70px] flex-1" aria-hidden />
            <span className="h-28 w-40">{totalMin}분</span>
            <span className="min-w-[70px] flex-1" aria-hidden />
            <span className="flex h-28 w-48 items-center gap-4">
              <span className="h-20 w-23">
                {totalAcorn < 0 ? "-" : "+"}
                {Math.abs(totalAcorn)}
              </span>
              <IcAcorn className="h-29 w-21" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
