export const ONBOARDING_TOPICS = [
  {
    id: "economy",
    label: "경제와 금융",
    subtopics: [
      "경제의 흐름",
      "금융 상식과 세금",
      "기업과 산업",
      "부동산과 대출",
      "투자의 기초",
    ],
  },
  {
    id: "it",
    label: "IT",
    subtopics: [
      "CS",
      "최신 기술 트렌드",
      "데이터 리터러시",
      "IT 비즈니스와 생태계",
      "반도체와 하드웨어",
    ],
  },
  {
    id: "english",
    label: "영어",
    subtopics: [
      "콩글리시와 오역 교정",
      "비즈니스 이메일&패턴",
      "문법/어휘 기초",
      "글로벌 현장 언어",
      "영어 뉴스/시사 리딩",
    ],
  },
  {
    id: "current",
    label: "시사",
    subtopics: [
      "사회/정책 이슈",
      "마케팅과 소비 트렌드",
      "문학/라이프스타일",
      "환경/기후",
      "국제/외교 이슈",
    ],
  },
  {
    id: "humanities",
    label: "인문",
    subtopics: [
      "철학/심리",
      "역사/문명",
      "문학/에세이",
      "인간관계/감정",
      "예술",
    ],
  },
] as const;

export type OnboardingTimePanel = {
  id: string;
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
};

export const ONBOARDING_TIME_PANELS: OnboardingTimePanel[] = [
  {
    id: "short",
    title: "5-10분",
    description: "짤막하게 생기는\n자투리 시간",
  },
  {
    id: "medium",
    title: "30분",
    description: "일과 사이를\n이어주는 적당한 시간",
  },
  {
    id: "long",
    title: "1시간 이상",
    description: "온전히 나에게\n집중하는 시간",
  },
  {
    id: "unknown",
    title: "잘 모르겠어요",
    description: "나의 빈칸을\n찾아보고 싶어요",
  },
];
