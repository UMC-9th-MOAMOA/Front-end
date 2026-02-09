import { useMemo, useState } from "react";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcMinus from "@/assets/icons/ic_minus.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import type {
  AcornHistoryFilterKey,
  AcornHistoryItem,
  AcornHistorySortKey,
} from "../types/mypage.type";
import AcornHistoryFilter, { type DoneMissionOption } from "./filters/AcornHistoryFilter";

const getTitle = (title: string) => title || "도토리 내역";

export default function AcornHistory({ items }: { items: AcornHistoryItem[] }) {
  const [filter, setFilter] = useState<AcornHistoryFilterKey>("all");
  const [sortKey, setSortKey] = useState<AcornHistorySortKey>("recent");
  const [earnSource, setEarnSource] = useState<DoneMissionOption>("mission");

  const filtered = useMemo(() => {
    let base = items;

    if (filter === "progress") {
      base = base.filter((x) => x.status === "progress");
    }
    if (filter === "done") {
      base = base.filter((x) => x.status === "done");
    }

    const now = new Date();
    const monthsToDays = (months: number) => months * 30;
    const withinDays = (dateStr: string, days: number) => {
      const date = new Date(dateStr);
      if (Number.isNaN(date.getTime())) return false;
      const diffMs = now.getTime() - date.getTime();
      return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
    };

    if (sortKey === "3m") {
      base = base.filter((x) => withinDays(x.date, monthsToDays(3)));
    }
    if (sortKey === "6m") {
      base = base.filter((x) => withinDays(x.date, monthsToDays(6)));
    }

    const copied = [...base];
    if (sortKey === "recent") copied.sort((a, b) => b.date.localeCompare(a.date));
    if (sortKey === "oldest") copied.sort((a, b) => a.date.localeCompare(b.date));

    return copied;
  }, [items, filter, sortKey]);

  return (
    <section className="mt-19 flex w-full flex-col gap-4 px-2">
      <h3 className="heading-5 h-25 w-full text-black">도토리 히스토리</h3>

      <AcornHistoryFilter
        filter={filter}
        onChangeFilter={setFilter}
        sortKey={sortKey}
        onChangeSort={setSortKey}
        earnSource={earnSource}
        onChangeEarnSource={setEarnSource}
      >
        <div className="flex w-full flex-1 min-h-[60vh] pr-9 pl-8">
          {filtered.length === 0 ? (
            <div className="body-4 p-6 text-center text-gray-500">
              도토리 내역이 없어요.
            </div>
          ) : (
            <ul className="w-full pb-20">
              {filtered.map((item) => {
                const [yy, mm, dd] = item.date.split("-");
                const delta = item.acornDelta;
                const isMinus = delta < 0;

                return (
                  <li key={item.id} className="border-gray-400 border-b py-4">
                    <div className="flex h-106 w-full flex-col items-start justify-center gap-4 self-stretch px-17 py-12">
                      <div className="body-2 flex items-center gap-4 text-gray-500">
                        <span>{yy}</span>
                        <span>-</span>
                        <span>{mm}</span>
                        <span>-</span>
                        <span>{dd}</span>
                      </div>

                      <div className="flex h-40 w-full items-center">
                        <div className="heading-5 h-28 flex-1 truncate text-black">
                          {getTitle(item.missionTitle)}
                        </div>

                        <div className="flex items-center gap-4">
                          {isMinus ? (
                            <IcMinus className="h-16 w-16 shrink-0" aria-hidden />
                          ) : (
                            <IcPlus className="h-16 w-16 shrink-0" aria-hidden />
                          )}
                          <span className="heading-5 text-black">
                            {Math.abs(delta)}
                          </span>
                          <IcAcorn className="h-40 w-29 shrink-0" aria-hidden />
                        </div>
                      </div>

                      <div
                        className={[
                          "body-2",
                          isMinus ? "text-warning" : "text-moamoa-300",
                        ].join(" ")}
                      >
                        {isMinus ? "도토리 사용" : "도토리 적립"}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </AcornHistoryFilter>
    </section>
  );
}

