import { useState } from "react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import { Button } from "@/components/common/button/Button";
import type {
  MissionCategoryFilter,
  MissionTimeSort,
} from "../missioncard/missionList.types";

type Props = {
  timeSort: MissionTimeSort;
  category: MissionCategoryFilter;
  onChangeTime: (value: MissionTimeSort) => void;
  onChangeCategory: (value: MissionCategoryFilter) => void;
  isEmpty: boolean;
};

type MenuKey = "time" | "category" | null;

const TIME_OPTIONS = [
  { key: "recent", label: "최근 저장 순" },
  { key: "short", label: "소요시간 짧은 순" },
  { key: "long", label: "소요시간 긴 순" },
] as const;

const CATEGORY_OPTIONS = [
  { key: "all", label: "전체" },
  { key: "경제와 금융", label: "경제와 금융" },
  { key: "IT", label: "IT" },
  { key: "영어", label: "영어" },
  { key: "시사", label: "시사" },
  { key: "인문", label: "인문" },
] as const;

export default function MissionFilters({
  timeSort,
  category,
  onChangeTime,
  onChangeCategory,
  isEmpty,
}: Props) {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);

  return (
    <div className="mb-9 flex w-full flex-nowrap items-start gap-60">
      <div className="relative">
        <Button
          type="button"
          onClick={() =>
            setOpenMenu((prev) => (prev === "time" ? null : "time"))
          }
          className="flex h-28 w-134 flex-col items-start gap-4 py-4 pr-10 pl-33"
        >
          <div className="flex items-center justify-start gap-10">
            <span className="body-4 whitespace-nowrap text-black">
              {TIME_OPTIONS.find((opt) => opt.key === timeSort)?.label ??
                "소요시간 순"}
            </span>
            <IcDropdown
              className={[
                "h-12 w-12 shrink-0",
                openMenu === "time" ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden
            />
          </div>
        </Button>

        {openMenu === "time" && (
          <div
            className={[
              "absolute top-full right-0 z-50 flex h-103 w-128 flex-col items-start justify-center gap-4 rounded-lg border border-gray-400 py-10",
              isEmpty ? "bg-[#E6E6E6]" : "bg-gray-100",
            ].join(" ")}
            style={{ boxShadow: "3px 9px 20.1px 3px rgba(0, 0, 0, 0.10)" }}
          >
            <div className="flex w-full flex-col justify-center gap-10 px-6">
              {TIME_OPTIONS.map((opt) => {
                const selected = timeSort === opt.key;

                return (
                  <Button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      onChangeTime(opt.key);
                      setOpenMenu(null);
                    }}
                    className="body-4 flex h-18 w-80 items-center"
                  >
                    <span className="w-20 shrink-0 text-positive">
                      {selected ? "✓" : ""}
                    </span>

                    <span
                      className={[
                        "whitespace-nowrap",
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

      <div className="relative">
        <Button
          type="button"
          onClick={() =>
            setOpenMenu((prev) => (prev === "category" ? null : "category"))
          }
          className="flex h-28 w-116 flex-col items-center gap-4 py-4"
        >
          <div className="flex items-center gap-14">
            <span className="body-4 text-black">
              {CATEGORY_OPTIONS.find((opt) => opt.key === category)?.label ??
                "전체"}
            </span>
            <IcDropdown
              className={[
                "h-12 w-12 shrink-0",
                openMenu === "category" ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden
            />
          </div>
        </Button>
        {openMenu === "category" && (
          <div
            className={[
              "absolute top-full left-0 z-50 flex h-174 w-116 flex-col items-start justify-center gap-4 rounded-xl border border-gray-400 py-10",
              isEmpty ? "bg-[#E6E6E6]" : "bg-gray-100",
            ].join(" ")}
            style={{ boxShadow: "3px 9px 20.1px 3px rgba(0, 0, 0, 0.10)" }}
          >
            <div className="flex w-full flex-col justify-center gap-10 px-6">
              {CATEGORY_OPTIONS.map((opt) => {
                const selected = category === opt.key;

                return (
                  <Button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      onChangeCategory(opt.key);
                      setOpenMenu(null);
                    }}
                    className="body-4 flex h-18 w-80 items-center"
                  >
                    <span className="w-20 shrink-0 text-positive">
                      {selected ? "✓" : ""}
                    </span>

                    <span
                      className={[
                        "whitespace-nowrap",
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
    </div>
  );
}
