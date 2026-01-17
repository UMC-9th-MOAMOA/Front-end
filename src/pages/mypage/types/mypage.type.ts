export type MissionStatus = "success" | "progress" | "fail";
export type PerformanceMissionKind = "attendance" | "ad" | "mission";

export interface PerformanceMission {
  id: string;
  kind: PerformanceMissionKind;
  title: string; // "출석" | "광고" | 실제 미션명
  acornDelta: number; // +1
}

export interface PerformanceItem {
  id: string;
  durationMin: number;
  status: MissionStatus;
  missions: PerformanceMission[]; // 👈 추가
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
  expectedMinutes: number; // 예상 소요시간(분)
  category: MissionCategory;
  quizType: "OX" | "객관식" | "주관식";
  liked: boolean;
  done: boolean; // 완료 여부
};

export type AcornHistoryFilterKey = "all" | "progress" | "done";

export type AcornHistorySortKey = "recent" | "doneMission";

export interface AcornHistoryItem {
  id: string;
  date: string; // "2026-01-20"
  missionTitle: string;
  acornDelta: number; // +1 같은 값 (나중에 -도 가능)
  status: "progress" | "done"; // “진행중/완료”
}
