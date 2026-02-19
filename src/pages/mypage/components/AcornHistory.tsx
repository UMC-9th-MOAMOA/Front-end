import { useMemo, useState } from "react";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcMinus from "@/assets/icons/ic_minus.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useMyWalletHistory } from "../hooks/useMyWalletHistory";
import type {
  AcornHistoryFilterKey,
  AcornHistorySortKey,
} from "../types/mypage.type";
import AcornHistoryFilter, {
  type DoneMissionOption,
} from "./filters/AcornHistoryFilter";

const toApiTab = (filter: AcornHistoryFilterKey) => {
  if (filter === "progress") return "EARN" as const;
  if (filter === "done") return "USE" as const;
  return "ALL" as const;
};

const toApiSort = (sortKey: AcornHistorySortKey) => {
  if (sortKey === "oldest") return "OLDEST" as const;
  return "RECENT" as const;
};

const toApiPeriod = (sortKey: AcornHistorySortKey) => {
  if (sortKey === "3m") return "THREE_MONTHS" as const;
  if (sortKey === "6m") return "SIX_MONTHS" as const;
  return "ALL" as const;
};

const toApiEarnSource = (value: DoneMissionOption) => {
  if (value === "all") return "ALL" as const;
  if (value === "attendance") return "ATTENDANCE" as const;
  return "MISSION" as const;
};

const getTitle = (title: string | null, categoryLabel: string | null) => {
  if (title) return title;
  if (categoryLabel) return categoryLabel;
  return "도토리 내역";
};

const ITEM_TYPE_LABEL: Record<string, string> = {
  BACKGROUND: "배경",
  HAT: "모자",
  BOTTOM: "하의",
  TOP: "상의",
  FACE: "표정",
  GLOVES: "장갑",
  SHOES: "신발",
  SCARF: "목도리",
  GLASSES: "안경",
};

export default function AcornHistory() {
  const [filter, setFilter] = useState<AcornHistoryFilterKey>("all");
  const [sortKey, setSortKey] = useState<AcornHistorySortKey>("recent");
  const [earnSource, setEarnSource] = useState<DoneMissionOption>("all");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyWalletHistory({
      tab: toApiTab(filter),
      sort: toApiSort(sortKey),
      period: toApiPeriod(sortKey),
      earnSource: filter === "progress" ? toApiEarnSource(earnSource) : undefined,
    });

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const items = useMemo(
    () => data.pages.flatMap((page) => page.items),
    [data.pages]
  );

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
        <div className="flex min-h-[60vh] w-full flex-1 items-start justify-center px-8">
          {items.length === 0 ? (
            <div className="body-4 p-6 text-center text-gray-500">
              도토리 내역이 없어요
            </div>
          ) : (
            <ul className="w-full">
              {items.map((item, index) => {
                const dateStr = item.createdAt?.split("T")[0] ?? "";
                const date = dateStr ? new Date(dateStr) : new Date("");
                const hasValidDate = !Number.isNaN(date.getTime());
                const yy = hasValidDate ? date.getFullYear() : "-";
                const mm = hasValidDate
                  ? `${date.getMonth() + 1}`.padStart(2, "0")
                  : "-";
                const dd = hasValidDate
                  ? `${date.getDate()}`.padStart(2, "0")
                  : "-";
                const delta = item.amount;
                const isMinus = delta < 0;

                const isLast = index === items.length - 1;

                return (
                  <li
                    key={
                      item.walletHistoryId ??
                      `${item.createdAt}-${item.type}-${index}`
                    }
                    className={[
                      "py-4",
                      isLast ? "" : "border-b border-gray-400",
                    ].join(" ")}
                  >
                    <div className="flex h-106 w-full flex-col items-start justify-center gap-4 self-stretch px-17 py-12">
                      <div className="body-2 flex items-center gap-4 text-gray-500">
                        <span>{yy}</span>
                        <span>-</span>
                        <span>{mm}</span>
                        <span>-</span>
                        <span>{dd}</span>
                      </div>

                      <div className="flex h-40 w-full items-center">
                        <div className="flex h-28 flex-1 items-center gap-12 truncate">
                          {item.itemType && (
                            <span className="body-4 flex h-27 w-60 flex-shrink-0 items-center justify-center gap-4 rounded-sm bg-gray-100 px-16 py-5 text-gray-700">
                              {ITEM_TYPE_LABEL[item.itemType] ?? item.itemType}
                            </span>
                          )}
                          <span className="heading-5 truncate pr-5 text-black">
                            {getTitle(item.title, item.categoryLabel)}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          {isMinus ? (
                            <IcMinus
                              className="h-16 w-16 shrink-0"
                              aria-hidden
                            />
                          ) : (
                            <IcPlus
                              className="h-16 w-16 shrink-0"
                              aria-hidden
                            />
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

              {hasNextPage && (
                <li ref={ref} className="flex w-full justify-center py-12">
                  {isFetchingNextPage && <LoadingSpinner className="size-24" />}
                </li>
              )}
            </ul>
          )}
        </div>
      </AcornHistoryFilter>
    </section>
  );
}
