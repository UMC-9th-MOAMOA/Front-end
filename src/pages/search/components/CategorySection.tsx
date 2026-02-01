import { Button } from "@/components/common/button/Button";
import { MAIN_CATEGORIES, type MainCategory } from "@/mocks/search/mission";
import { cn } from "@/utils/cn/cn";

interface CategorySectionProps {
  selectedCategory: MainCategory;
  onCategoryChange: (category: MainCategory) => void;
}

export default function CategorySection({
  selectedCategory,
  onCategoryChange,
}: CategorySectionProps) {
  return (
    <div className="mt-12">
      <h2 className="heading-1 flex justify-center text-black">Category</h2>

      <div className="-mx-layout-side mt-21 overflow-x-auto">
        <div className="flex min-w-full gap-5 px-layout-side">
          {MAIN_CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "body-4 shrink-0 grow rounded-sm px-16 py-8",
                selectedCategory === category
                  ? "bg-moamoa-300 text-white"
                  : "bg-moamoa-50 text-moamoa-300",
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
