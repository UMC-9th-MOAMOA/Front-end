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
            className="absolute top-full left-0 z-50 mt-5 flex w-128 flex-col items-start justify-center gap-4 rounded-xl border border-[var(--color-gray-400)] bg-[var(--color-gray-100)] py-10 shadow-sm"
            style={{ boxShadow: "3px 9px 20.1px 3px rgba(0, 0, 0, 0.10)" }}
          >
            {" "}
            {(
              [
                { key: "recent", label: "최근 저장 순" },
                { key: "short", label: "소요시간 짧은 순" },
                { key: "long", label: "소요시간 긴 순" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  onChangeTime(opt.key);
                  setOpenMenu(null);
                }}
                className={[
                  "flex w-full items-center gap-6 px-6 py-10",
                  "body-4",
                  timeSort === opt.key
                    ? "text-[var(--color-gray-700)]"
                    : "text-[var(--color-gray-600)]",
                ].join(" ")}
              >
                <span className="w-12 shrink-0 text-[var(--color-positive)]">
                  {timeSort === opt.key ? "✓" : ""}
                </span>
                <span className="whitespace-nowrap">{opt.label}</span>
              </button>
            ))}
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
              {category === "all" ? "Category" : category}
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
          <div className="absolute top-[24px] right-0 w-[160px] rounded-[12px] bg-white shadow-sm">
            {(
              ["all", "경제와 금융", "IT", "영어", "시사", "인문"] as const
            ).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onChangeCategory(c);
                  setOpenMenu(null);
                }}
                className="w-full px-[12px] py-[10px] text-left text-[12px] leading-[12px]"
              >
                {c === "all" ? "전체" : c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
