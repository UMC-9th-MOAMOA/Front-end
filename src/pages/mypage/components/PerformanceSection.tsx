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
    <section className="flex w-342 flex-col items-center rounded-xl bg-white px-10 py-24 shadow-sm">
      <div className="flex w-full flex-col items-center gap-20">
        <div className="flex w-full flex-col items-center gap-10">
          <h2 className="heading-2 text-center text-[var(--color-black)]">
            {data.userName}의 성과
          </h2>
        </div>

        <div className="w-full">
          <PerformanceMissionList rows={rows} />
        </div>

        <div className="heading-3 flex h-28 w-272 items-center gap-70 text-[var(--color-black)]">
          <span className="shrink-0">Total</span>
          <span className="shrink-0">{totalMin}분</span>
          <span className="flex shrink-0 items-center gap-6">
            +{totalAcorn}
            <IcAcorn className="h-26 w-19" aria-hidden />
          </span>
        </div>
      </div>
    </section>
  );
}
