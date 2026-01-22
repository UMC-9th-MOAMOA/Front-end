export interface MissionSummary {
  missionId: number;
  title: string;
  keywords: string[];
  estimatedTime: number;
  categoryName: string;
  quizCount: number;
  isLiked: boolean;
  description?: string;
}

// 컴포넌트에서 사용하는 변환된 미션 타입
export interface Mission {
  id: number;
  title: string;
  keywords: string[];
  minute: number;
  category: string;
  quizCount: number;
  isLiked: boolean;
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface MainMissionResponse {
  recommendedMissions: MissionSummary[];
  categories: Category[];
  initialMissions: MissionSummary[];
}

export interface CategoryResultResponse {
  mainCategories: Category[];
  subCategories: Category[];
  missions: MissionSummary[];
  hasNextPage: boolean;
}
