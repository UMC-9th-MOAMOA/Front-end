import type { InquiryCategory } from "../../types/inquiry.type";

const CATEGORY_ROWS: InquiryCategory[][] = [
  ["보상", "미션 및 퀴즈", "상점 및 꾸미기"],
  ["계정", "기타"],
];

const CATEGORY_OPTIONS = CATEGORY_ROWS.flat();

type Props = {
  selected: InquiryCategory | null;
  onSelect: (category: InquiryCategory) => void;
};

type CategoryButtonProps = {
  label: InquiryCategory;
  selected: boolean;
  onClick: () => void;
};

function CategoryButton({ label, selected, onClick }: CategoryButtonProps) {
  const widthClass =
    label === "미션 및 퀴즈"
      ? "w-98"
      : label === "상점 및 꾸미기"
        ? "w-110"
        : "w-56";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex h-34 items-center justify-center gap-4 rounded-sm px-16 py-8",
        widthClass,
        selected
          ? "bg-[var(--color-moamoa-300)] text-white"
          : "bg-[var(--color-moamoa-50)] text-moamoa-300",
      ].join(" ")}
    >
      <span className="body-4 whitespace-nowrap">{label}</span>
    </button>
  );
}

export default function InquiryCategorySection({ selected, onSelect }: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-15">
      <p className="heading-5 whitespace-nowrap text-black">
        카테고리 선택
      </p>

      <div className="flex w-full flex-wrap gap-8">
        {CATEGORY_OPTIONS.map((category) => (
          <CategoryButton
            key={category}
            label={category}
            selected={selected === category}
            onClick={() => onSelect(category)}
          />
        ))}
      </div>
    </div>
  );
}
