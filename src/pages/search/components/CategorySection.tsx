import { useState } from "react";
import { MAIN_CATEGORIES, type MainCategory } from "@/mocks/search/mission";

interface CategorySectionProps {
  onCategoryChange?: (category: MainCategory) => void;
}

export default function CategorySection({
  onCategoryChange,
}: CategorySectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<MainCategory>("경제와 금융");

  const handleCategoryClick = (category: MainCategory) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="mt-12">
      <h2 className="heading-1 flex justify-center text-black">Category</h2>

      <div className="mt-21 flex gap-5">
        {MAIN_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className={`body-4 rounded-sm px-16 py-8 ${
              selectedCategory === category
                ? "bg-moamoa-300 text-white"
                : "bg-moamoa-50 text-moamoa-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
