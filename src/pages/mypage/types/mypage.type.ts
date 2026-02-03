export type MissionStatus = "success" | "progress" | "fail";
export type PerformanceMissionKind = "attendance" | "ad" | "mission";

export interface PerformanceMission {
  id: string;
  kind: PerformanceMissionKind;
  title: string;
  acornDelta: number;
}

export interface PerformanceItem {
  id: string;
  durationMin: number;
  status: MissionStatus;
  missions: PerformanceMission[];
}

export interface PerformanceSummary {
  userName: string;
  items: PerformanceItem[];
}

export type MyPageTopTabKey = "all" | "mission" | "acorn";

export type MissionSubTabKey = "liked" | "done";

export type MissionCategory = "경제와 금융" | "IT" | "영어" | "시사" | "인문";

export type MissionItem = {
  id: string;
  title: string;
  expectedMinutes: number;
  category: MissionCategory;
  quizType: "OX" | "객관식" | "주관식";
  liked: boolean;
  done: boolean;
};

export type AcornHistoryFilterKey = "all" | "progress" | "done";

export type AcornHistorySortKey =
  | "recent"
  | "oldest"
  | "3m"
  | "6m"
  | "doneMission";

export interface AcornHistoryItem {
  id: string;
  date: string;
  missionTitle: string;
  acornDelta: number;
  status: "progress" | "done";
}
