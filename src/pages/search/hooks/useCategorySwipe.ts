import { useState } from "react";
import { useSwipe } from "@/hooks/useSwipe";
import { MAIN_CATEGORIES, type MainCategory } from "@/mocks/search/mission";

export function useCategorySwipe(
  initialCategory: MainCategory = "경제와 금융",
  onCategoryChange?: (category: MainCategory) => void
) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const currentIndex = MAIN_CATEGORIES.indexOf(selectedCategory);

  const handleCategoryChange = (category: MainCategory) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  const handleSwipeLeft = () => {
    if (currentIndex < MAIN_CATEGORIES.length - 1) {
      handleCategoryChange(MAIN_CATEGORIES[currentIndex + 1]);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      handleCategoryChange(MAIN_CATEGORIES[currentIndex - 1]);
    }
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
  });

  return {
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    swipeHandlers,
  };
}
