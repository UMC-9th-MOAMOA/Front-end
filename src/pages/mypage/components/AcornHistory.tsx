import { useMemo, useState } from "react";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";

import type {
  AcornHistoryFilterKey,
  AcornHistoryItem,
  AcornHistorySortKey,
} from "../types/mypage.type";

function formatDelta(n: number) {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n}`;
}

export default function AcornHistory({ items }: { items: AcornHistoryItem[] }) {
  const [filter, setFilter] = useState<AcornHistoryFilterKey>("all");
  const [sortKey, setSortKey] = useState<AcornHistorySortKey>("recent");

  const filtered = useMemo(() => {
    let base = items;

    if (filter === "progress")
      base = base.filter((x) => x.status === "progress");
    if (filter === "done") base = base.filter((x) => x.status === "done");

    const copied = [...base];

    if (sortKey === "recent") {
      // "YYYY-MM-DD" 문자열은 기본적으로 내림차순 정렬 가능
      copied.sort((a, b) => b.date.localeCompare(a.date));
    }

    return copied;
  }, [items, filter, sortKey]);

  return (
    <section className="mt-4">
      <h3 className="font-bold text-gray-700 text-sm">도토리 히스토리</h3>

      {/* 필터 탭 */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={[
            "rounded-xl px-4 py-2 font-semibold text-sm",
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-500",
          ].join(" ")}
        >
          전체
        </button>

        <button
          type="button"
          onClick={() => setFilter("progress")}
          className={[
            "rounded-xl px-4 py-2 font-semibold text-sm",
            filter === "progress"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-500",
          ].join(" ")}
        >
          진행중
        </button>

        <button
          type="button"
          onClick={() => setFilter("done")}
          className={[
            "rounded-xl px-4 py-2 font-semibold text-sm",
            filter === "done"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-500",
          ].join(" ")}
        >
          완료
        </button>
      </div>

      {/* 정렬 */}
      <div className="mt-4 flex items-center justify-between text-gray-600 text-sm">
        <button
          type="button"
          onClick={() => setSortKey("recent")}
          className="flex items-center gap-1"
        >
          <span>최근순</span>
          <span
            className={sortKey === "recent" ? "text-black" : "text-gray-400"}
          >
            ▾
          </span>
        </button>
      </div>

      {/* 리스트 박스 */}
      <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">
            도토리 내역이 없어요.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filtered.map((item) => (
              <li key={item.id} className="px-5 py-4">
                <div className="text-gray-400 text-xs">{item.date}</div>

                <div className="mt-1 flex items-center justify-between">
                  <div className="truncate font-semibold text-gray-900 text-sm">
                    {item.missionTitle}
                  </div>

                  <div className="flex items-center gap-1 text-gray-800 text-sm">
                    <span>{formatDelta(item.acornDelta)}</span>
                    <IcAcorn className="h-[40px] w-[29px]" aria-hidden />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 많은 데이터 대비(나중에 API 붙일 때) */}
      <div className="mt-2 text-gray-400 text-xs">
        {/* TODO(API 연결 시): 페이지네이션/무한스크롤로 교체 */}
      </div>
    </section>
  );
}
