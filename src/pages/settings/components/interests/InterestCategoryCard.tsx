import IcDash from "@/assets/icons/ic.dottedline.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import type { InterestWithDetails } from "@/types/interest/interest.setting";

type SelectedMap = Record<number, number[]>;

type InterestSubButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

type InterestCategoryCardProps = {
  category: InterestWithDetails;
  isOpen: boolean;
  selected: SelectedMap;
  onToggle: () => void;
  onToggleSub: (interestId: number, subInterestId: number) => void;
};

function InterestSubButton({
  label,
  selected,
  onClick,
}: InterestSubButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "body-4 flex h-34 shrink-0 items-center justify-center gap-4 whitespace-nowrap rounded-lg px-16 py-8",
        selected ? "bg-moamoa-300 text-white" : "bg-moamoa-50 text-moamoa-300",
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
  const rows = [category.details.slice(0, 3), category.details.slice(3)].filter(
    (row) => row.length > 0
  );
  const selectedCount = selected[category.id]?.length ?? 0;
  const isActive = selectedCount > 0;

  return (
    <div
      className={[
        "flex w-full flex-col items-start rounded-xl border-2 bg-white",
        isActive ? "border-moamoa-300" : "border-black",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-26 py-13"
        aria-expanded={isOpen}
        aria-label={`${category.name} ${isOpen ? "닫기" : "열기"}`}
      >
        <div className="flex items-center gap-12">
          <span className="heading-4 text-black">{category.name}</span>

          <span className="body-2 text-gray-900">{selectedCount}개 선택</span>
        </div>

        <IcLeft
          className={[
            "h-24 w-24 text-black",
            isOpen ? "rotate-90" : "-rotate-90",
          ].join(" ")}
          aria-hidden
        />
      </button>

      {isOpen && (
        <>
          <div className="w-full px-12">
            <IcDash className="block w-full" aria-hidden />
          </div>
          <div className="w-full pr-27 pb-21 pl-27">
            <div className="mt-21 w-full">
              <div className="-mx-27 overflow-x-auto">
                <div className="flex w-max flex-nowrap gap-16 px-27">
                  {rows.flat().map((sub) => (
                    <InterestSubButton
                      key={sub.id}
                      label={sub.name}
                      selected={
                        selected[category.id]?.includes(sub.id) ?? false
                      }
                      onClick={() => onToggleSub(category.id, sub.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
