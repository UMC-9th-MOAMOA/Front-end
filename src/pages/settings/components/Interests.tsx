import { useState } from "react";
import Header from "@/components/common/header/Header";
import type {
  InterestCategoryKey,
  InterestSubKey,
} from "../constants/interests";
import {
  EMPTY_SELECTED_INTERESTS,
  INTEREST_CATEGORIES,
  toggleSubSelection,
} from "../constants/interests";
import BottomActionBar from "./common/BottomActionBar";
import InterestCategoryCard from "./interests/InterestCategoryCard";

export default function InterestPage() {
  const [expanded, setExpanded] = useState<InterestCategoryKey | null>(null);
  const [selected, setSelected] = useState(EMPTY_SELECTED_INTERESTS);

  const toggle = (key: InterestCategoryKey) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  const handleToggleSub = (
    categoryKey: InterestCategoryKey,
    subKey: InterestSubKey
  ) => {
    setSelected((prev) => toggleSubSelection(prev, categoryKey, subKey));
  };

  return (
    <div className="flex w-full flex-col bg-white pb-98">
      <Header title="관심사 변경" property="common" />

      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="mt-24 w-full px-25 text-center">
        <p className="body-4 whitespace-nowrap text-moamoa-300">
          관심사를 변경하실 수 있습니다
        </p>
      </div>

      <div className="mt-26 flex w-full flex-1 flex-col items-start gap-30">
        {INTEREST_CATEGORIES.map((cat) => (
          <InterestCategoryCard
            key={cat.key}
            category={cat}
            isOpen={expanded === cat.key}
            selected={selected}
            onToggle={() => toggle(cat.key)}
            onToggleSub={handleToggleSub}
          />
        ))}
      </div>

      <BottomActionBar
        label="설정 저장하기"
        onClick={() => {
          // TODO: 관심사 저장 API 호출 로직 구현
        }}
      />
    </div>
  );
}
