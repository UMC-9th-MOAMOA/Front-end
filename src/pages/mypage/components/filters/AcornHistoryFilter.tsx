import { type ReactNode, useState } from "react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import type {
  AcornHistoryFilterKey,
  AcornHistorySortKey,
} from "../../types/mypage.type";

type RecentSortOption = "recent" | "oldest" | "3m" | "6m";

type DoneMissionOption = "done" | "retry" | "attendance" | "ad";

const DONE_MISSION_OPTIONS: Array<{ key: DoneMissionOption; label: string }> = [
  { key: "done", label: "완료 미션" },
  { key: "retry", label: "재도전 미션" },
  { key: "attendance", label: "출석" },
  { key: "ad", label: "광고" },
];
const RECENT_SORT_OPTIONS: Array<{ key: RecentSortOption; label: string }> = [
  { key: "recent", label: "최근 순" },
  { key: "oldest", label: "오래된 순" },
  { key: "3m", label: "3개월" },
  { key: "6m", label: "6개월" },
];
type Props = {
  filter: AcornHistoryFilterKey;
  onChangeFilter: (key: AcornHistoryFilterKey) => void;
  sortKey: AcornHistorySortKey;
  onChangeSort: (key: AcornHistorySortKey) => void;
  children: ReactNode;
};

const FILTER_TABS: Array<{ key: AcornHistoryFilterKey; label: string }> = [
  { key: "all", label: "전체" },
  { key: "progress", label: "적립" },
  { key: "done", label: "성공" },
];

const filterTabBase =
  "flex w-56 items-center justify-center gap-4 px-16 py-8 whitespace-nowrap body-4 rounded-sm";

export default function AcornHistoryFilter({
  filter,
  onChangeFilter,
  sortKey,
  onChangeSort,
  children,
}: Props) {
  const [isDoneOpen, setIsDoneOpen] = useState(false);
  const [doneOption, setDoneOption] = useState<DoneMissionOption>("done");

  const doneLabel =
    DONE_MISSION_OPTIONS.find((o) => o.key === doneOption)?.label ??
    "완료 미션";
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [recentOption, setRecentOption] = useState<RecentSortOption>("recent");
  const recentLabel =
    RECENT_SORT_OPTIONS.find((o) => o.key === recentOption)?.label ?? "최근 순";
  return (
    <>
      {(isRecentOpen || isDoneOpen) && (
        <button
          type="button"
          aria-label="close dropdown"
          onClick={() => {
            setIsRecentOpen(false);
            setIsDoneOpen(false);
          }}
          className="fixed inset-0 z-30 cursor-default"
        />
      )}

      <div className="flex flex-col">
        {/* 필터 탭 */}
        <div className="mt-12 flex h-34 w-190 gap-8">
          {FILTER_TABS.map((tab) => {
            const isActive = filter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onChangeFilter(tab.key)}
                className={[
                  filterTabBase,
                  isActive
                    ? "bg-[var(--color-moamoa-300)] text-[var(--color-white)]"
                    : "bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-300)]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 카드(정렬 버튼 + 리스트(children)) */}
        <div className="relative mt-14 flex h-410 w-324 flex-col overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="flex flex-1 flex-col pt-14">
            {/* 정렬 버튼 */}
            <div className="relative z-40 flex h-26 w-200 items-center gap-12 pl-13">
              <div className="relative h-26 w-88 shrink-0">
                {/* 닫힌 버튼은 항상 존재: 열리면 invisible로만 처리 */}
                <button
                  type="button"
                  onClick={() => {
                    setIsRecentOpen(true);
                    setIsDoneOpen(false);
                  }}
                  className={[
                    "flex h-26 w-88 shrink-0 items-center justify-center gap-4 rounded-sm bg-[var(--color-gray-200)] px-8",
                    isRecentOpen ? "invisible" : "visible",
                  ].join(" ")}
                >
                  <span className="body-4 whitespace-nowrap text-[var(--color-black)]">
                    {recentLabel}
                  </span>
                  <span className="w-5" />
                  <IcDropdown aria-hidden />
                </button>

                {isRecentOpen && (
                  <div className="absolute top-0 left-0 z-50 flex h-124 w-88 flex-col items-center gap-4 rounded-sm bg-[var(--color-gray-200)] px-8 py-4 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setIsRecentOpen(false)}
                      className="flex w-full items-center justify-center"
                    >
                      <span className="body-4 text-[var(--color-black)]">
                        {recentLabel}
                      </span>
                      <span className="w-5" />
                      <IcDropdown className="rotate-180" aria-hidden />
                    </button>

                    {/* 72x1 bar + border 1px */}
                    <div className="h-1 w-72 border border-[var(--color-gray-400)]" />

                    <div className="h-10 w-1" />

                    <div className="flex w-full flex-col gap-4">
                      {RECENT_SORT_OPTIONS.map((opt) => {
                        const selected = recentOption === opt.key;
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => {
                              setRecentOption(opt.key);
                              setIsRecentOpen(false);
                            }}
                            className="flex w-full items-center gap-6"
                          >
                            <span className="w-12 shrink-0 text-[var(--color-positive)]">
                              {selected ? "✓" : ""}
                            </span>
                            <span
                              className={[
                                "body-4",
                                selected
                                  ? "text-[var(--color-gray-700)]"
                                  : "text-[var(--color-gray-600)]",
                              ].join(" ")}
                            >
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative h-26 w-100 shrink-0">
                {/* 닫힌 버튼: 항상 존재(자리 유지), 열리면 invisible */}
                <button
                  type="button"
                  onClick={() => {
                    setIsDoneOpen(true);
                    setIsRecentOpen(false);
                  }}
                  className={[
                    "flex h-26 w-100 shrink-0 items-center justify-center gap-4 rounded-sm bg-[var(--color-gray-200)] px-8",
                    isDoneOpen ? "invisible" : "visible",
                  ].join(" ")}
                >
                  <span className="body-4 whitespace-nowrap text-[var(--color-black)]">
                    {doneLabel}
                  </span>
                  <span className="w-5" />
                  <IcDropdown aria-hidden />
                </button>

                {/* 열렸을 때: 88×124 드롭다운 박스(이미지처럼) */}
                {isDoneOpen && (
                  <div className="absolute top-0 left-0 z-50 flex h-124 w-100 flex-col items-center gap-4 rounded-sm bg-[var(--color-gray-200)] px-8 py-4 shadow-sm">
                    {/* 헤더 */}
                    <button
                      type="button"
                      onClick={() => setIsDoneOpen(false)}
                      className="flex w-full items-center justify-center"
                    >
                      <span className="body-4 text-[var(--color-black)]">
                        {doneLabel}
                      </span>
                      <span className="w-5" />
                      <IcDropdown className="rotate-180" aria-hidden />
                    </button>

                    {/* 바 (72×1 + border 1px) */}
                    <div className="h-1 w-72 border border-[var(--color-gray-400)]" />

                    {/* 바 아래 10 */}
                    <div className="h-10 w-1" />

                    {/* 옵션 4개 + 체크 */}
                    <div className="flex w-full flex-col gap-4">
                      {DONE_MISSION_OPTIONS.map((opt) => {
                        const selected = doneOption === opt.key;

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => {
                              setDoneOption(opt.key);
                              setIsDoneOpen(false);
                              // TODO: 실제 필터/정렬 연결은 나중에 매핑
                            }}
                            className="flex w-full items-center gap-6"
                          >
                            <span className="w-12 shrink-0 text-[var(--color-positive)]">
                              {selected ? "✓" : ""}
                            </span>

                            <span
                              className={[
                                "body-4",
                                selected
                                  ? "text-[var(--color-gray-700)]"
                                  : "text-[var(--color-gray-600)]",
                              ].join(" ")}
                            >
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* 리스트(children) */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
