export interface MissionDetailQuiz {
  quizId: number;
  type: string;
  question: string;
  option?: string[] | null;
  explanation: string;
  answer: string;
  acceptedAnswers: string[];
}

export interface MissionDetailResult {
  missionId: number;
  title: string;
  interest: string;
  videoUrl: string;
  durationMinutes: number;
  videoLength: number;
  totalReward: number;
  keyword: string[];
  quizzes: MissionDetailQuiz[];
  isContentWatched: boolean;
  attemptCount: number;
  rewardAt: string | null;
}
