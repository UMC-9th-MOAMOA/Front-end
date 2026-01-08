export type MissionStatus = "success" | "progress" | "fail";

export interface PerformanceItem {
  id: string;
  missionTitle: string;
  durationMin: number; // 10분
  acornDelta: number; // +1 같은 값
  status: MissionStatus;
}

export interface PerformanceSummary {
  userName: string;
  items: PerformanceItem[];
}

export type MyPageTopTabKey = "all" | "mission" | "acorn";

export type MissionSubTabKey = "liked" | "done";

export type MissionCategory = "경제" | "IT" | "건강" | "기타";

export type MissionItem = {
  id: string;
  title: string;
  expectedMinutes: number; // 예상 소요시간(분)
  category: MissionCategory;
  quizType: "OX" | "객관식" | "주관식";
  liked: boolean;
  done: boolean; // 완료 여부
};

export type AcornHistoryFilterKey = "all" | "progress" | "done";

export type AcornHistorySortKey = "recent"; // 추후 확장 가능 (oldest 등)

export interface AcornHistoryItem {
  id: string;
  date: string; // "2026-01-20"
  missionTitle: string;
  acornDelta: number; // +1 같은 값 (나중에 -도 가능)
  status: "progress" | "done"; // “진행중/완료”
}
