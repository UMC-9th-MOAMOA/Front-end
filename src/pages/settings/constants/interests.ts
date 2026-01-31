// src/pages/settings/constants/interests.ts

export type InterestCategoryKey =
  | "finance"
  | "it"
  | "english"
  | "current"
  | "humanities";

export type InterestSubKey =
  | "finance_flow"
  | "finance_common"
  | "finance_realestate"
  | "finance_industry"
  | "finance_investing"
  | "it_cs"
  | "it_trend"
  | "it_data"
  | "it_ecosystem"
  | "it_semiconductor"
  | "english_konglish"
  | "english_business"
  | "english_grammar_vocab"
  | "english_global"
  | "english_news"
  | "current_society_policy"
  | "current_marketing"
  | "current_culture"
  | "current_environment"
  | "current_diplomacy"
  | "human_philosophy_psych"
  | "human_history"
  | "human_culture"
  | "human_experience"
  | "human_art";

export type InterestSubItem = {
  key: InterestSubKey;
  label: string;
};

export type InterestCategoryItem = {
  key: InterestCategoryKey;
  label: string;
  subs: InterestSubItem[];
};

export const INTEREST_CATEGORIES: InterestCategoryItem[] = [
  {
    key: "finance",
    label: "경제와 금융",
    subs: [
      { key: "finance_flow", label: "경제 흐름" },
      { key: "finance_common", label: "금융 상식" },
      { key: "finance_realestate", label: "부동산" },
      { key: "finance_industry", label: "기업과 산업" },
      { key: "finance_investing", label: "투자 기초" },
    ],
  },
  {
    key: "it",
    label: "IT",
    subs: [
      { key: "it_cs", label: "CS" },
      { key: "it_trend", label: "트렌드" },
      { key: "it_data", label: "데이터" },
      { key: "it_ecosystem", label: "IT 생태계" },
      { key: "it_semiconductor", label: "반도체" },
    ],
  },
  {
    key: "english",
    label: "영어",
    subs: [
      { key: "english_konglish", label: "콩글리시" },
      { key: "english_business", label: "비즈니스" },
      { key: "english_grammar_vocab", label: "문법과 어휘" },
      { key: "english_global", label: "글로벌 현장" },
      { key: "english_news", label: "영어 뉴스" },
    ],
  },
  {
    key: "current",
    label: "시사",
    subs: [
      { key: "current_society_policy", label: "사회 정책" },
      { key: "current_marketing", label: "마케팅" },
      { key: "current_culture", label: "문화" },
      { key: "current_environment", label: "환경" },
      { key: "current_diplomacy", label: "국제 외교" },
    ],
  },
  {
    key: "humanities",
    label: "인문",
    subs: [
      { key: "human_philosophy_psych", label: "철학 및 심리" },
      { key: "human_history", label: "역사" },
      { key: "human_culture", label: "문화" },
      { key: "human_experience", label: "경험" },
      { key: "human_art", label: "예술" },
    ],
  },
] as const;

export type SelectedInterestsMap = Record<
  InterestCategoryKey,
  InterestSubKey[]
>;

export const EMPTY_SELECTED_INTERESTS: SelectedInterestsMap = {
  finance: [],
  it: [],
  english: [],
  current: [],
  humanities: [],
};

export function getSelectedCount(
  selected: SelectedInterestsMap,
  category: InterestCategoryKey
) {
  return selected[category].length;
}

export function isSubSelected(
  selected: SelectedInterestsMap,
  category: InterestCategoryKey,
  subKey: InterestSubKey
) {
  return selected[category].includes(subKey);
}

export function toggleSubSelection(
  selected: SelectedInterestsMap,
  category: InterestCategoryKey,
  subKey: InterestSubKey
): SelectedInterestsMap {
  const current = selected[category];
  const exists = current.includes(subKey);

  return {
    ...selected,
    [category]: exists
      ? current.filter((k) => k !== subKey)
      : [...current, subKey],
  };
}
