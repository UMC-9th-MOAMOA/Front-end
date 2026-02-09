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
