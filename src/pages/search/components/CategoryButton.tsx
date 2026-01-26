import { Button } from "@/components/common/button/Button";
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
    <Button
      data-category={category}
      onClick={() => onClick(category)}
      className={`heading-5 shrink-0 grow whitespace-nowrap ${
        isSelected ? "border-black border-b text-black" : "text-gray-500"
      }`}
    >
      {category}
    </Button>
  );
}
