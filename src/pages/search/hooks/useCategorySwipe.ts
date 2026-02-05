import { useEffect, useState } from "react";
import {
  MAIN_CATEGORIES,
  type MainCategory,
} from "@/constants/missions/categories";
import { useSwipe } from "@/hooks/useSwipe";

export function useCategorySwipe(
  initialCategory: MainCategory = "경제와 금융",
  onCategoryChange?: (category: MainCategory) => void
) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const currentIndex = MAIN_CATEGORIES.indexOf(selectedCategory);

  useEffect(() => {
    if (initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, selectedCategory]);

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
