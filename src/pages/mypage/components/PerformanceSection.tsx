import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import type { MissionStatus, PerformanceSummary } from "../types/mypage.type";

function StatusPill({ status }: { status: MissionStatus }) {
  const label =
    status === "success" ? "성공" : status === "fail" ? "실패" : "진행중";

  // 디자인 확정 전: 상태별 톤만 구분
  const className =
    status === "success"
      ? "bg-gray-200 text-gray-600"
      : status === "fail"
        ? "bg-gray-200 text-gray-600"
        : "bg-gray-200 text-gray-600";

  return (
    <span
      className={[
        "inline-flex min-w-[3.25rem] justify-center rounded-lg px-3 py-1 text-sm",
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function formatAcorn(delta: number) {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta}`;
}

export default function PerformanceSection({
  data,
}: {
  data: PerformanceSummary;
}) {
  const totalMin = data.items.reduce((acc, cur) => acc + cur.durationMin, 0);
  const totalAcorn = data.items.reduce((acc, cur) => acc + cur.acornDelta, 0);

  return (
    <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-center font-bold text-lg">{data.userName}의 성과</h2>

      {/* 헤더 row */}
      <div className="mt-4 grid grid-cols-[1fr_4rem_4.5rem_4.5rem] items-center font-semibold text-gray-700 text-sm">
        <div className="whitespace-nowrap">미션 이름</div>
        <div className="text-center">시간</div>
        <div className="text-center">도토리</div>
        <div className="text-right" />
      </div>

      <div className="mt-2 border-blue-200 border-t" />

      {/* 목록 */}
      <ul className="divide-y divide-gray-100">
        {data.items.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-[1fr_4rem_4.5rem_4.5rem] items-center py-3"
          >
            <div className="truncate text-gray-900 text-sm">
              {item.missionTitle}
            </div>

            <div className="text-center text-gray-700 text-sm">
              {item.durationMin}분
            </div>

            <div className="flex items-center justify-center gap-1 text-gray-700 text-sm">
              <span>{formatAcorn(item.acornDelta)}</span>
              <IcAcorn className="h-[40px] w-[29px]" aria-hidden />
            </div>

            <div className="flex justify-end">
              <StatusPill status={item.status} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-blue-200 border-t" />

      {/* Total */}
      <div className="mt-3 grid grid-cols-[1fr_4rem_4.5rem_4.5rem] items-center font-semibold">
        <div className="text-gray-900">Total</div>
        <div className="text-center">{totalMin}분</div>
        <div className="flex items-center justify-center gap-1">
          <span>{formatAcorn(totalAcorn)}</span>
          <IcAcorn className="h-[40px] w-[29px]" aria-hidden />
        </div>
        <div />
      </div>
    </section>
  );
}
