import type { MainCategory } from "@/mocks/search/mission";

interface CategoryButtonProps {
  category: MainCategory;
  isSelected: boolean;
  onClick: (category: MainCategory) => void;
}

export default function CategoryButton({
  category,
  isSelected,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className={`heading-5 shrink-0 ${
        isSelected ? "border-black border-b text-black" : "text-gray-500"
      }`}
    >
      {category}
    </button>
  );
}
