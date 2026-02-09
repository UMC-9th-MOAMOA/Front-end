import { type ReactNode, useState } from "react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import { Button } from "@/components/common/button/Button";
import type {
  AcornHistoryFilterKey,
  AcornHistorySortKey,
} from "../../types/mypage.type";

type RecentSortOption = "recent" | "oldest" | "3m" | "6m";
export type DoneMissionOption = "mission" | "attendance";

const FILTER_TABS: Array<{ key: AcornHistoryFilterKey; label: string }> = [
  { key: "all", label: "전체" },
  { key: "progress", label: "적립" },
  { key: "done", label: "사용" },
];

const RECENT_SORT_OPTIONS: Array<{ key: RecentSortOption; label: string }> = [
  { key: "recent", label: "최근 순" },
  { key: "oldest", label: "오래된 순" },
  { key: "3m", label: "3개월" },
  { key: "6m", label: "6개월" },
];

const DONE_MISSION_OPTIONS: Array<{ key: DoneMissionOption; label: string }> = [
  { key: "mission", label: "미션" },
  { key: "attendance", label: "출석" },
];

type Props = {
  filter: AcornHistoryFilterKey;
  onChangeFilter: (key: AcornHistoryFilterKey) => void;
  sortKey: AcornHistorySortKey;
  onChangeSort: (key: AcornHistorySortKey) => void;
  earnSource: DoneMissionOption;
  onChangeEarnSource: (key: DoneMissionOption) => void;
  children: ReactNode;
};

const filterTabBase =
  "flex h-32 flex-1 items-center justify-center whitespace-nowrap body-4 rounded-sm border border-moamoa-50 px-16 py-8";
const filterBox =
  "flex h-32 w-168 items-stretch gap-0 overflow-hidden rounded-sm bg-moamoa-50";

export default function AcornHistoryFilter({
  filter,
  onChangeFilter,
  sortKey,
  onChangeSort,
  earnSource,
  onChangeEarnSource,
  children,
}: Props) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isEarnSourceOpen, setIsEarnSourceOpen] = useState(false);
  const [recentOption, setRecentOption] = useState<RecentSortOption>(
    sortKey === "doneMission" ? "recent" : sortKey
  );

  const sortLabel =
    RECENT_SORT_OPTIONS.find((o) => o.key === recentOption)?.label ?? "최근 순";
  const earnSourceLabel =
    DONE_MISSION_OPTIONS.find((o) => o.key === earnSource)?.label ?? "미션";
  const showEarnSourceFilter = filter === "progress";

  const handleSelectSort = (key: RecentSortOption) => {
    setRecentOption(key);
    onChangeSort(key);
    setIsSortOpen(false);
  };

  const handleSelectFilter = (key: AcornHistoryFilterKey) => {
    onChangeFilter(key);
    setIsSortOpen(false);
    if (key !== "progress") {
      setIsEarnSourceOpen(false);
    }
  };

  return (
    <>
      {(isSortOpen || isEarnSourceOpen) && (
        <Button
          type="button"
          aria-label="드롭다운 닫기"
          onClick={() => {
            setIsSortOpen(false);
            setIsEarnSourceOpen(false);
          }}
          className="fixed inset-0 z-30 cursor-default"
        >
          <span className="sr-only">드롭다운 닫기</span>
        </Button>
      )}

      <div className="flex flex-col pb-20">
        <div className="mt-12 flex h-34 w-full justify-start">
          <div className={filterBox}>
            {FILTER_TABS.map((tab, index) => {
              const isActive = filter === tab.key;
              return (
                <Button
                  key={tab.key}
                  type="button"
                  onClick={() => handleSelectFilter(tab.key)}
                  className={[
                    filterTabBase,
                    index > 0 ? "border-l-0" : "",
                    "first:rounded-l-sm last:rounded-r-sm",
                    isActive
                      ? "bg-moamoa-300 text-white"
                      : "bg-moamoa-50 text-moamoa-300",
                  ].join(" ")}
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-14 flex w-full flex-col rounded-xl bg-white shadow-sm">
          <div className="flex flex-1 flex-col pt-14">
            <div className="relative flex h-26 items-center gap-12 px-13">
              <div className="relative h-26 w-88">
                <Button
                  type="button"
                  onClick={() => {
                    setIsSortOpen(true);
                    setIsEarnSourceOpen(false);
                  }}
                  className={[
                    "flex w-88 items-center justify-center gap-5 rounded-sm bg-gray-200 px-8 py-4",
                    isSortOpen ? "invisible" : "visible",
                  ].join(" ")}
                >
                  <span className="body-4 whitespace-nowrap text-black">
                    {sortLabel}
                  </span>
                  <IcDropdown className="h-7 w-13" aria-hidden />
                </Button>

                {isSortOpen && (
                  <div className="absolute top-0 left-0 z-50 flex h-124 w-88 flex-col items-center gap-2 rounded-sm bg-gray-200 px-8 py-4 shadow-sm">
                    <Button
                      type="button"
                      onClick={() => setIsSortOpen(false)}
                      className="flex w-full items-center justify-center"
                    >
                      <span className="body-4 text-black">{sortLabel}</span>
                      <span className="w-5" />
                      <IcDropdown className="rotate-180" aria-hidden />
                    </Button>

                    <div className="h-1 w-full border border-gray-400" />
                    <div className="h-10 w-1" />

                    <div className="flex w-full flex-col gap-4">
                      {RECENT_SORT_OPTIONS.map((opt) => {
                        const selected = recentOption === opt.key;
                        return (
                          <Button
                            key={opt.key}
                            type="button"
                            onClick={() => handleSelectSort(opt.key)}
                            className="flex w-full items-center gap-6"
                          >
                            <span className="w-12 shrink-0 text-positive">
                              {selected ? "✓" : ""}
                            </span>
                            <span
                              className={[
                                "body-4 whitespace-nowrap",
                                selected ? "text-moamoa-700" : "text-gray-700",
                              ].join(" ")}
                            >
                              {opt.label}
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {showEarnSourceFilter && (
                <div className="relative h-26 w-60">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEarnSourceOpen(true);
                      setIsSortOpen(false);
                    }}
                    className={[
                      "flex h-26 w-60 items-center justify-center gap-5 rounded-sm bg-gray-200 px-8 py-4",
                      isEarnSourceOpen ? "invisible" : "visible",
                    ].join(" ")}
                  >
                    <span className="body-4 whitespace-nowrap text-black">
                      {earnSourceLabel}
                    </span>
                    <IcDropdown className="h-7 w-13" aria-hidden />
                  </Button>

                  {isEarnSourceOpen && (
                    <div className="absolute top-0 left-0 z-50 flex h-80 w-60 flex-col items-center gap-2 rounded-sm bg-gray-200 px-8 py-4 pb-6 shadow-sm">
                      <Button
                        type="button"
                        onClick={() => setIsEarnSourceOpen(false)}
                        className="flex w-full items-center justify-center"
                      >
                        <span className="body-4 text-black">
                          {earnSourceLabel}
                        </span>
                        <span className="w-5" />
                        <IcDropdown className="rotate-180" aria-hidden />
                      </Button>

                      <div className="h-1 w-full border border-gray-400" />
                      <div className="h-10 w-1" />

                      <div className="flex w-full flex-col gap-4">
                        {DONE_MISSION_OPTIONS.map((opt) => {
                          const selected = earnSource === opt.key;
                          return (
                            <Button
                              key={opt.key}
                              type="button"
                              onClick={() => {
                                onChangeEarnSource(opt.key);
                                setIsEarnSourceOpen(false);
                              }}
                              className="flex w-full items-center gap-6"
                            >
                              <span className="w-12 shrink-0 text-positive">
                                {selected ? "✓" : ""}
                              </span>
                              <span
                                className={[
                                  "body-4 whitespace-nowrap",
                                  selected
                                    ? "text-moamoa-700"
                                    : "text-gray-700",
                                ].join(" ")}
                              >
                                {opt.label}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
