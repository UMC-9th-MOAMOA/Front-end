export interface MissionApiResponse {
  missionId: number;
  title: string;
  durationMinutes: number;
  category: string;
  quizCount: number;
  keywords: string[];
  isScrapped: boolean;
  videoUrl: string;
  description?: string;
}

export interface MissionsPageResponse {
  missions: MissionApiResponse[];
  hasNext: boolean;
}

export type MissionStatus = "NONE" | "SCRAP" | "FAIL";

export interface MissionStatusResult {
  missionId: number;
  status: string;
  attemptCount: number;
}

export interface Category {
  categoryId: number;
  name: string;
}

// 미션 상세 조회 응답
export interface MissionDetailResponse {
  missionId: number;
  title: string;
  interest: string;
  videoUrl: string;
  videoLength: number; // 영상 길이 (초 단위) - 시청 완료 계산용
  durationMinutes: number; // 예상 소요시간 (분 단위) - 영상 + 퀴즈 시간
  totalReward: number;
  keyword: string[];
  quizzes: Quiz[];
  isContentWatched: boolean;
  attemptCount: number;
  rewardAt: string | null;
}

export interface Quiz {
  quizId: number;
  type: QuizType;
  question: string;
  option: string[];
  answer: string;
  acceptedAnswers: string[];
  explanation: string;
}

export type QuizType = "SHORT" | "OX" | "MULTIPLE";

// 시청 완료 응답
export interface WatchMissionResponse {
  missionId: number;
  isContentWatched: boolean;
  status: MissionStatus;
}

// 미션 상태 변경 요청/응답
export type MissionStatusRequest = "NONE" | "SCRAP" | "FAIL";

export interface StatusChangeResponse {
  missionId: number;
  status: MissionStatus;
  attemptCount: number;
}

// 퀴즈 제출 요청/응답
export interface SubmitQuizRequest {
  submissions: Array<{
    quizId: number;
    answer: string;
  }>;
}

export interface SubmitQuizResponse {
  isSuccess: boolean;
  missionReward: number;
  goalReward: number;
  totalReward: number;
  dailyCount: number;
  dailyGoalAchieved: boolean;
  weeklyCount: number;
  weeklyGoalAchieved: boolean;
}
