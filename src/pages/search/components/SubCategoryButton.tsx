import { Button } from "@/components/common/button/Button";
import { cn } from "@/utils/cn/cn";

interface SubCategoryButtonProps {
  category: {
    categoryId: number;
    name: string;
  };
  isSelected: boolean;
  onClick: (name: string) => void;
}

export default function SubCategoryButton({
  category,
  isSelected,
  onClick,
}: SubCategoryButtonProps) {
  return (
    <Button
      data-category={category.name}
      onClick={() => onClick(category.name)}
      className={cn(
        "body-4 w-92 shrink-0 grow rounded-sm py-8",
        isSelected ? "bg-moamoa-300 text-white" : "bg-moamoa-50 text-moamoa-300"
      )}
    >
      {category.name}
    </Button>
  );
}
