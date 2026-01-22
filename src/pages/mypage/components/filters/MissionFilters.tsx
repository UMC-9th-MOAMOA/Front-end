import { useState } from "react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import type {
  MissionCategoryFilter,
  MissionTimeSort,
} from "../missioncard/missionList.types";

type Props = {
  timeSort: MissionTimeSort;
  category: MissionCategoryFilter;
  onChangeTime: (value: MissionTimeSort) => void;
  onChangeCategory: (value: MissionCategoryFilter) => void;
};

type MenuKey = "time" | "category" | null;

export default function MissionFilters({
  timeSort,
  category,
  onChangeTime,
  onChangeCategory,
}: Props) {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);

  return (
    <div className="mx-auto mb-9 flex h-28 w-310 items-start gap-60">
      {/* 왼쪽: 소요시간 정렬 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenMenu((p) => (p === "time" ? null : "time"))}
          className="flex h-28 w-134 flex-col items-start gap-4 px-10 py-4"
        >
          <div className="flex items-center gap-10">
            <span className="body-4 text-[var(--color-black)]">
              {timeSort === "recent"
                ? "최근 저장 순"
                : timeSort === "short"
                  ? "소요시간 짧은 순"
                  : "소요시간 긴 순"}
            </span>
            <IcDropdown
              className={[
                "h-12 w-12 shrink-0",
                openMenu === "time" ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden
            />
          </div>
        </button>
        {/* time 드롭다운 메뉴 */}
        {openMenu === "time" && (
          <div
            className="absolute top-full left-0 z-50 flex h-103 w-128 flex-col items-start justify-center gap-4 rounded-xl border border-[var(--color-gray-400)] bg-[var(--color-gray-100)] py-10"
            style={{ boxShadow: "3px 9px 20.1px 3px rgba(0, 0, 0, 0.10)" }}
          >
            <div className="flex w-full flex-col justify-center gap-10 px-6">
              {(
                [
                  { key: "recent", label: "최근 저장 순" },
                  { key: "short", label: "소요시간 짧은 순" },
                  { key: "long", label: "소요시간 긴 순" },
                ] as const
              ).map((opt) => {
                const selected = timeSort === opt.key;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      onChangeTime(opt.key);
                      setOpenMenu(null);
                    }}
                    className="body-4 flex h-18 w-80 items-center"
                  >
                    <span className="w-20 shrink-0 text-[var(--color-positive)]">
                      {selected ? "✓" : ""}
                    </span>

                    <span
                      className={[
                        "whitespace-nowrap",
                        selected
                          ? "text-[var(--color-moamoa-700)]"
                          : "text-[var(--color-gray-700)]",
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

      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setOpenMenu((p) => (p === "category" ? null : "category"))
          }
          className="flex h-28 w-116 flex-col items-center gap-4 py-4"
        >
          <div className="flex items-center gap-14">
            <span className="body-4 text-[var(--color-black)]">
              {category === "all" ? "전체" : category}
            </span>
            <IcDropdown
              className={[
                "h-12 w-12 shrink-0",
                openMenu === "category" ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden
            />
          </div>
        </button>
        {openMenu === "category" && (
          <div
            className="absolute top-full left-0 z-50 flex h-174 w-116 flex-col items-start justify-center gap-4 rounded-xl border border-[var(--color-gray-400)] bg-[var(--color-gray-100)] py-10"
            style={{ boxShadow: "3px 9px 20.1px 3px rgba(0, 0, 0, 0.10)" }}
          >
            <div className="flex w-full flex-col justify-center gap-10 px-6">
              {(
                [
                  { key: "all", label: "전체" },
                  { key: "경제와 금융", label: "경제와 금융" },
                  { key: "IT", label: "IT" },
                  { key: "영어", label: "영어" },
                  { key: "시사", label: "시사" },
                  { key: "인문", label: "인문" },
                ] as const
              ).map((opt) => {
                const selected = category === opt.key;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      onChangeCategory(opt.key);
                      setOpenMenu(null);
                    }}
                    className="body-4 flex h-18 w-80 items-center"
                  >
                    <span className="w-20 shrink-0 text-[var(--color-positive)]">
                      {selected ? "✓" : ""}
                    </span>

                    <span
                      className={[
                        "whitespace-nowrap",
                        selected
                          ? "text-[var(--color-moamoa-700)]"
                          : "text-[var(--color-gray-700)]",
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
  );
}
