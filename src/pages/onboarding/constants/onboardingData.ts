export const ONBOARDING_TOPICS = [
  {
    id: "economy",
    interestId: 10,
    label: "경제와 금융",
    subtopics: [
      { label: "경제의 흐름", subInterestId: 11 },
      { label: "금융 상식과 세금", subInterestId: 12 },
      { label: "기업과 산업", subInterestId: 13 },
      { label: "부동산과 대출", subInterestId: 14 },
      { label: "투자의 기초", subInterestId: 15 },
    ],
  },
  {
    id: "it",
    interestId: 20,
    label: "IT",
    subtopics: [
      { label: "CS (Computer Science)", subInterestId: 21 },
      { label: "최신 기술 트렌드", subInterestId: 22 },
      { label: "데이터 리터러시", subInterestId: 23 },
      { label: "IT 비즈니스와 생태계", subInterestId: 24 },
      { label: "반도체와 하드웨어", subInterestId: 25 },
    ],
  },
  {
    id: "english",
    interestId: 30,
    label: "영어",
    subtopics: [
      { label: "콩글리시와 오역 교정", subInterestId: 31 },
      { label: "비즈니스 이메일&패턴", subInterestId: 32 },
      { label: "문법/어휘 기초", subInterestId: 33 },
      { label: "글로벌 현장 언어", subInterestId: 34 },
      { label: "영어 뉴스/시사 리딩", subInterestId: 35 },
    ],
  },
  {
    id: "current",
    interestId: 40,
    label: "시사",
    subtopics: [
      { label: "사회/정책 이슈", subInterestId: 41 },
      { label: "마케팅과 소비 트렌드", subInterestId: 42 },
      { label: "문화, 라이프스타일", subInterestId: 43 },
      { label: "환경, 기후", subInterestId: 44 },
      { label: "국제, 외교 이슈", subInterestId: 45 },
    ],
  },
  {
    id: "humanities",
    interestId: 50,
    label: "인문",
    subtopics: [
      { label: "철학, 심리", subInterestId: 51 },
      { label: "역사, 문명", subInterestId: 52 },
      { label: "문학, 에세이", subInterestId: 53 },
      { label: "인간관계, 감정", subInterestId: 54 },
      { label: "예술", subInterestId: 55 },
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
