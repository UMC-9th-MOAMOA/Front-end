import { useState } from "react";
import IcDash from "@/assets/icons/ic.dash.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import Header from "@/components/common/header/Header";
import type { InterestCategoryKey } from "../constants/interests";
import {
  EMPTY_SELECTED_INTERESTS,
  getSelectedCount,
  INTEREST_CATEGORIES,
  isSubSelected,
  toggleSubSelection,
} from "../constants/interests";

export default function InterestPage() {
  const [expanded, setExpanded] = useState<InterestCategoryKey | null>(null);
  const [selected, setSelected] = useState(EMPTY_SELECTED_INTERESTS);

  const toggle = (key: InterestCategoryKey) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  const getSubWidthClass = (label?: string) => {
    switch (label?.length) {
      case 2:
        return "w-50";
      case 3:
        return "w-68";
      case 4:
        return "w-80";
      case 5:
        return "w-83";
      default:
        return "w-80";
    }
  };

  return (
    <div className="bg-[var(--color-white)]">
      <Header title="관심사 변경" property="common" />

      <div className="mt-14 -ml-25 h-2 w-393 bg-[var(--color-gray-200)]" />
      <div className="mt-16 flex w-full justify-center">
        <div className="h-18 w-164">
          <span className="body-4 whitespace-nowrap text-[var(--color-moamoa-300)]">
            관심사를 변경하실 수 있습니다
          </span>
        </div>
      </div>

      <div className="mx-auto mt-77 flex h-380 w-325 flex-col items-start gap-30">
        {INTEREST_CATEGORIES.map((cat) => {
          const isOpen = expanded === cat.key;

          return (
            <div
              key={cat.key}
              className={[
                "flex w-325 flex-col items-start rounded-xl border-2 bg-white",
                "border-[var(--color-moamoa-100)]",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => toggle(cat.key)}
                className="flex h-52 w-full items-center justify-between px-26 py-13"
                aria-expanded={isOpen}
                aria-label={`${cat.label} ${isOpen ? "접기" : "펼치기"}`}
              >
                <div className="flex items-center gap-12">
                  <span className="heading-4 text-[var(--color-black)]">
                    {cat.label}
                  </span>

                  <span className="body-2 text-[var(--color-gray-900)]">
                    {getSelectedCount(selected, cat.key)}개 선택중
                  </span>
                </div>

                <IcLeft
                  className={[
                    "h-24 w-24 text-[var(--color-black)]",
                    isOpen ? "rotate-270" : "rotate-90",
                  ].join(" ")}
                  aria-hidden
                />
              </button>

              {isOpen && (
                <>
                  <div className="mx-auto w-301">
                    <IcDash className="block" aria-hidden />
                  </div>
                  <div className="w-full pb-21 pl-27">
                      {/* 구분선 아래 21 */}
                      <div className="h-21" />

                      {/* 1줄: 264 x 34, inline-flex, gap 16 (버튼 3개) */}
                      <div className="mx-auto inline-flex h-34 w-264 items-center gap-16">
                        {/* 경제 흐름 (label: "경제 흐름") -> 4글자 버튼(80x34) */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelected((prev) =>
                              toggleSubSelection(prev, cat.key, cat.subs[0].key)
                            )
                          }
                        className={[
                          "body-4 flex h-34 items-center justify-center gap-4 whitespace-nowrap rounded-lg px-16 py-8",
                          getSubWidthClass(cat.subs[0]?.label),
                          isSubSelected(selected, cat.key, cat.subs[0].key)
                            ? "bg-[var(--color-moamoa-300)] text-[var(--color-white)]"
                            : "bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-300)]",
                        ].join(" ")}
                        >
                          {cat.subs[0]?.label}
                        </button>

                        {/* 금융 상식 -> 4글자 버튼(80x34) */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelected((prev) =>
                              toggleSubSelection(prev, cat.key, cat.subs[1].key)
                            )
                          }
                        className={[
                          "body-4 flex h-34 items-center justify-center gap-4 whitespace-nowrap rounded-lg px-16 py-8",
                          getSubWidthClass(cat.subs[1]?.label),
                          isSubSelected(selected, cat.key, cat.subs[1].key)
                            ? "bg-[var(--color-moamoa-300)] text-[var(--color-white)]"
                            : "bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-300)]",
                        ].join(" ")}
                        >
                          {cat.subs[1]?.label}
                        </button>

                        {/* 부동산 -> 3글자 버튼(68x34) */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelected((prev) =>
                              toggleSubSelection(prev, cat.key, cat.subs[2].key)
                            )
                          }
                        className={[
                          "body-4 flex h-34 items-center justify-center gap-4 whitespace-nowrap rounded-lg px-16 py-8",
                          getSubWidthClass(cat.subs[2]?.label),
                          isSubSelected(selected, cat.key, cat.subs[2].key)
                            ? "bg-[var(--color-moamoa-300)] text-[var(--color-white)]"
                            : "bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-300)]",
                        ].join(" ")}
                        >
                          {cat.subs[2]?.label}
                        </button>
                      </div>

                      {/* 1줄 아래 15 */}
                      <div className="h-15" />

                      {/* 2줄: 191 x 34, inline-flex, gap 16 (버튼 2개) */}
                      <div className="mx-auto inline-flex h-34 w-191 items-center gap-16">
                        {/* 기업과 산업 -> 5글자 버튼(83x34) */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelected((prev) =>
                              toggleSubSelection(prev, cat.key, cat.subs[3].key)
                            )
                          }
                        className={[
                          "body-4 flex h-34 items-center justify-center gap-4 whitespace-nowrap rounded-lg px-16 py-8",
                          getSubWidthClass(cat.subs[3]?.label),
                          isSubSelected(selected, cat.key, cat.subs[3].key)
                            ? "bg-[var(--color-moamoa-300)] text-[var(--color-white)]"
                            : "bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-300)]",
                        ].join(" ")}
                        >
                          {cat.subs[3]?.label}
                        </button>

                        {/* 투자 기초 -> 4글자 버튼(80x34) */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelected((prev) =>
                              toggleSubSelection(prev, cat.key, cat.subs[4].key)
                            )
                          }
                        className={[
                          "body-4 flex h-34 items-center justify-center gap-4 whitespace-nowrap rounded-lg px-16 py-8",
                          getSubWidthClass(cat.subs[4]?.label),
                          isSubSelected(selected, cat.key, cat.subs[4].key)
                            ? "bg-[var(--color-moamoa-300)] text-[var(--color-white)]"
                            : "bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-300)]",
                        ].join(" ")}
                        >
                          {cat.subs[4]?.label}
                        </button>
                      </div>
                    </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
