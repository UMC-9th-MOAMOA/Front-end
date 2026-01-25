import IcDash from "@/assets/icons/ic.dottedline.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import type { InterestCategoryKey } from "../../constants/interests";
import {
  EMPTY_SELECTED_INTERESTS,
  getSelectedCount,
  INTEREST_CATEGORIES,
  isSubSelected,
} from "../../constants/interests";

type InterestCategory = (typeof INTEREST_CATEGORIES)[number];

type InterestSubButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

type InterestCategoryCardProps = {
  category: InterestCategory;
  isOpen: boolean;
  selected: typeof EMPTY_SELECTED_INTERESTS;
  onToggle: () => void;
  onToggleSub: (categoryKey: InterestCategoryKey, subKey: string) => void;
};

function InterestSubButton({ label, selected, onClick }: InterestSubButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "body-4 flex h-34 flex-1 items-center justify-center gap-4 whitespace-nowrap rounded-lg px-16 py-8",
        selected
          ? "bg-[var(--color-moamoa-300)] text-[var(--color-white)]"
          : "bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-300)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function InterestCategoryCard({
  category,
  isOpen,
  selected,
  onToggle,
  onToggleSub,
}: InterestCategoryCardProps) {
  const [sub0, sub1, sub2, sub3, sub4] = category.subs;
  const rows = [
    [sub0, sub1, sub2],
    [sub3, sub4],
  ];

  return (
    <div
      className={[
        "flex w-full flex-col items-start rounded-xl border-2 bg-[var(--color-white)]",
        "border-[var(--color-moamoa-100)]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-26 py-13"
        aria-expanded={isOpen}
        aria-label={`${category.label} ${isOpen ? "접기" : "펼치기"}`}
      >
        <div className="flex items-center gap-12">
          <span className="heading-4 text-[var(--color-black)]">
            {category.label}
          </span>

          <span className="body-2 text-[var(--color-gray-900)]">
            {getSelectedCount(selected, category.key)}개 선택중
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
          <div className="w-full px-12">
            <IcDash className="block w-full" aria-hidden />
          </div>
          <div className="w-full pb-21 pl-27 pr-27">
            <div className="h-21" />

            <div className="flex w-full flex-col gap-15">
              {rows.map((row, index) => (
                <div
                  key={row[0]?.key ?? index}
                  className="flex w-full items-center gap-16"
                >
                  {row.map((sub) => (
                    <InterestSubButton
                      key={sub.key}
                      label={sub.label}
                      selected={isSubSelected(selected, category.key, sub.key)}
                      onClick={() => onToggleSub(category.key, sub.key)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
