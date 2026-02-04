import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CATEGORY_ID_MAP,
  type Category,
  MAIN_CATEGORIES,
  type MainCategory,
  SUB_CATEGORIES,
} from "@/constants/missions/categories";
import { useCategorySwipe } from "./useCategorySwipe";

const getInitialSubCategory = (
  mainCategory: MainCategory,
  subParam: string | null
): Category => {
  const subCategories = SUB_CATEGORIES[mainCategory] ?? [];

  if (subParam) {
    const found = subCategories.find((s) => s.name === subParam);
    if (found) return found;
  }

  return subCategories[0] ?? { categoryId: 0, name: "" };
};

export const useCategoryDetailState = () => {
  const [searchParams] = useSearchParams();
  const mainParam = searchParams.get("main") || "";
  const subParam = searchParams.get("sub");

  const validMainCategory: MainCategory = MAIN_CATEGORIES.includes(
    mainParam as MainCategory
  )
    ? (mainParam as MainCategory)
    : "경제와 금융";

  // 카테고리뷰 진입 시 생성한 seed를 계속 유지 (페이지 넘길 때 중복 방지용)
  const seed = useRef(Date.now()).current;

  const [selectedSubCategory, setSelectedSubCategory] = useState<Category>(() =>
    getInitialSubCategory(validMainCategory, subParam)
  );

  useEffect(() => {
    setSelectedSubCategory(getInitialSubCategory(validMainCategory, subParam));
  }, [subParam, validMainCategory]);

  const { selectedCategory, setSelectedCategory, swipeHandlers } =
    useCategorySwipe(validMainCategory, (category) => {
      const firstSub = SUB_CATEGORIES[category]?.[0];
      if (firstSub) {
        setSelectedSubCategory(firstSub);
      }
    });

  const subCategories = SUB_CATEGORIES[selectedCategory] ?? [];
  const categoryId = CATEGORY_ID_MAP[selectedCategory];

  const handleSubCategoryClick = (name: string) => {
    const subCat = subCategories.find((s) => s.name === name);
    if (subCat) {
      setSelectedSubCategory(subCat);
    }
  };

  return {
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    subCategories,
    categoryId,
    seed,
    swipeHandlers,
    handleSubCategoryClick,
  };
};
