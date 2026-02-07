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
