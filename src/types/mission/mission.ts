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

export interface MissionDetailResponse {
  missionId: number;
  title: string;
  interest: string;
  videoUrl: string;
  videoLength: number;
  durationMinutes: number;
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
  previousCorrectAnswer: string | null;
}

export type QuizType = "SHORT" | "OX" | "MULTIPLE";

export interface WatchMissionResponse {
  missionId: number;
  isContentWatched: boolean;
  status: MissionStatus;
}

export type MissionStatusRequest = "NONE" | "SCRAP" | "FAIL";

export interface StatusChangeResponse {
  missionId: number;
  status: MissionStatus;
  attemptCount: number;
}

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
