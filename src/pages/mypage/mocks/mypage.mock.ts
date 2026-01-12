// mypage.mock.ts
export const mockCalendarData = [
  // 연속 1일 출석
  { date: "2026-01-01", type: "attendance" as const },

  // 연속 2일 출석 (마지막 날 도토리)
  { date: "2026-01-03", type: "attendance" as const },
  { date: "2026-01-04", type: "acorn" as const },

  // 연속 3일 출석 (마지막 날 도토리)
  { date: "2026-01-06", type: "attendance" as const },
  { date: "2026-01-07", type: "attendance" as const },
  { date: "2026-01-08", type: "acorn" as const },
];

// Calendar.tsx가 요구하는 형태로 변환
export const calendarMarks = mockCalendarData.map((item) => ({
  date: item.date,
  attended: item.type === "attendance" || item.type === "acorn",
  hasAcorn: item.type === "acorn",
}));

import type { PerformanceSummary } from "../types/mypage.type";

export const mockPerformance: PerformanceSummary = {
  userName: "이름이름",
  items: [
    {
      id: "1",
      missionTitle: "미션 이름",
      durationMin: 10,
      acornDelta: 1,
      status: "success",
    },
    {
      id: "2",
      missionTitle: "미션 이름",
      durationMin: 10,
      acornDelta: 1,
      status: "success",
    },
    {
      id: "3",
      missionTitle: "미션 이름",
      durationMin: 10,
      acornDelta: 1,
      status: "fail",
    },
    {
      id: "4",
      missionTitle: "미션 이름",
      durationMin: 10,
      acornDelta: 1,
      status: "progress",
    },
  ],
};

import type { MissionItem } from "../types/mypage.type";

export const mockLikedMissions: MissionItem[] = [
  {
    id: "m1",
    title: "미션 이름",
    expectedMinutes: 10,
    category: "경제",
    quizType: "OX",
    liked: true,
    done: false,
  },
  {
    id: "m2",
    title: "미션 이름",
    expectedMinutes: 10,
    category: "경제",
    quizType: "OX",
    liked: true,
    done: false,
  },
  {
    id: "m3",
    title: "미션 이름",
    expectedMinutes: 20,
    category: "IT",
    quizType: "객관식",
    liked: true,
    done: false,
  },
];

export const mockDoneMissions: MissionItem[] = [
  {
    id: "d1",
    title: "완료한 미션",
    expectedMinutes: 15,
    category: "건강",
    quizType: "OX",
    liked: false,
    done: true,
  },
];

import type { AcornHistoryItem } from "../types/mypage.type";

export const mockAcornCount = 20;

export const mockAcornHistory: AcornHistoryItem[] = [
  {
    id: "a1",
    date: "2026-01-20",
    missionTitle: "미션 이름",
    acornDelta: 1,
    status: "done",
  },
  {
    id: "a2",
    date: "2026-01-20",
    missionTitle: "미션 이름",
    acornDelta: 1,
    status: "progress",
  },
  {
    id: "a3",
    date: "2026-01-18",
    missionTitle: "미션 이름",
    acornDelta: 2,
    status: "done",
  },
  {
    id: "a4",
    date: "2026-01-17",
    missionTitle: "미션 이름",
    acornDelta: 1,
    status: "progress",
  },
];
