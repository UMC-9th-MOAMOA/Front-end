import { useMemo, useState } from "react";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";

import type {
  AcornHistoryFilterKey,
  AcornHistoryItem,
  AcornHistorySortKey,
} from "../types/mypage.type";

import AcornHistoryFilter from "./filters/AcornHistoryFilter";

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
      copied.sort((a, b) => b.date.localeCompare(a.date));
    }

    return copied;
  }, [items, filter, sortKey]);

  return (
    <section className="mt-19">
      <h3 className="heading-5 h-25 w-190 text-[var(--color-black)]">
        도토리 히스토리
      </h3>

      <AcornHistoryFilter
        filter={filter}
        onChangeFilter={setFilter}
        sortKey={sortKey}
        onChangeSort={setSortKey}
      >
        <div className="flex-1 overflow-y-auto pr-9 pl-8">
          {filtered.length === 0 ? (
            <div className="body-4 p-6 text-center text-[var(--color-gray-500)]">
              도토리 내역이 없어요.
            </div>
          ) : (
            <ul>
              {filtered.map((item) => {
                const [yy, mm, dd] = item.date.split("-");

                return (
                  <li
                    key={item.id}
                    className="border-[var(--color-gray-400)] border-b py-4"
                  >
                    <div className="flex h-106 w-307 flex-col items-start justify-center gap-4 self-stretch px-17 py-12">
                      <div className="body-2 flex items-center gap-4 text-[var(--color-gray-500)]">
                        {[yy, mm, dd].map((v, i) => (
                          <span key={i}>
                            {i > 0 && "-"}
                            {v}
                          </span>
                        ))}
                      </div>

                      <div className="flex h-40 w-273 items-center">
                        <div className="heading-5 h-28 w-158 truncate text-[var(--color-black)]">
                          {item.missionTitle}
                        </div>

                        <div className="w-42" />

                        <div className="flex items-center gap-4">
                          <IcPlus className="h-16 w-16 shrink-0" aria-hidden />
                          <span className="heading-5 text-[var(--color-black)]">
                            {Math.abs(item.acornDelta)}
                          </span>
                          <IcAcorn className="h-40 w-29 shrink-0" aria-hidden />
                        </div>
                      </div>
                      <div className="body-2 text-[var(--color-moamoa-300)]">
                        도토리 적립
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </AcornHistoryFilter>

      {/* 많은 데이터 대비(나중에 API 붙일 때) */}
      <div className="mt-2 text-gray-400 text-xs">
        {/* TODO(API 연결 시): 페이지네이션/무한스크롤로 교체 */}
      </div>
    </section>
  );
}
