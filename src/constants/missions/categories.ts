import type { Category } from "@/types/mission/mission";

export type { Category };

export const MAIN_CATEGORIES = [
  "경제와 금융",
  "IT",
  "영어",
  "시사",
  "인문",
] as const;

export type MainCategory = (typeof MAIN_CATEGORIES)[number];

export const CATEGORY_ID_MAP: Record<MainCategory, number> = {
  "경제와 금융": 10,
  IT: 20,
  영어: 30,
  시사: 40,
  인문: 50,
};

export const SUB_CATEGORIES: Record<MainCategory, Category[]> = {
  "경제와 금융": [
    { categoryId: 11, name: "경제 흐름" },
    { categoryId: 12, name: "금융상식" },
    { categoryId: 13, name: "기업과 산업" },
    { categoryId: 14, name: "부동산" },
    { categoryId: 15, name: "투자기초" },
  ],
  IT: [
    { categoryId: 21, name: "CS" },
    { categoryId: 22, name: "트렌드" },
    { categoryId: 23, name: "데이터" },
    { categoryId: 24, name: "IT 생태계" },
    { categoryId: 25, name: "반도체" },
  ],
  영어: [
    { categoryId: 31, name: "콩글리시" },
    { categoryId: 32, name: "비즈니스" },
    { categoryId: 33, name: "문법과 어휘" },
    { categoryId: 34, name: "글로벌 현장" },
    { categoryId: 35, name: "영어 뉴스" },
  ],
  시사: [
    { categoryId: 41, name: "사회,정책" },
    { categoryId: 42, name: "마케팅" },
    { categoryId: 43, name: "문화" },
    { categoryId: 44, name: "환경" },
    { categoryId: 45, name: "국제,외교" },
  ],
  인문: [
    { categoryId: 51, name: "철학 및 심리" },
    { categoryId: 52, name: "역사" },
    { categoryId: 53, name: "문화" },
    { categoryId: 54, name: "경험" },
    { categoryId: 55, name: "예술" },
  ],
};
