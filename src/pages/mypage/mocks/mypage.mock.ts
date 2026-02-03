import type { PerformanceSummary } from "../types/mypage.type";

export const mockPerformance: PerformanceSummary = {
  userName: "이름이름",
  items: [
    {
      id: "row-1",
      durationMin: 10,
      status: "success",
      missions: [
        {
          id: "att-1",
          kind: "attendance",
          title: "출석",
          acornDelta: 1,
        },
        {
          id: "ad-1",
          kind: "ad",
          title: "광고",
          acornDelta: 2,
        },
        {
          id: "mission-1",
          kind: "mission",
          title: "미션 이름",
          acornDelta: 3,
        },
      ],
    },
  ],
};

export const mockCalendarData = [
  { date: "2026-01-01", type: "attendance" as const },

  { date: "2026-01-03", type: "attendance" as const },
  { date: "2026-01-04", type: "acorn" as const },

  { date: "2026-01-06", type: "attendance" as const },
  { date: "2026-01-07", type: "attendance" as const },
  { date: "2026-01-08", type: "acorn" as const },
];

export const calendarMarks = mockCalendarData.map((item) => ({
  date: item.date,
  attended: item.type === "attendance" || item.type === "acorn",
  hasAcorn: item.type === "acorn",
}));

import type { MissionItem } from "../types/mypage.type";

export const mockLikedMissions: MissionItem[] = [
  {
    id: "m1",
    title: "미션 이름",
    expectedMinutes: 10,
    category: "경제와 금융",
    quizType: "OX",
    liked: true,
    done: false,
  },
  {
    id: "m2",
    title: "미션 이름",
    expectedMinutes: 10,
    category: "경제와 금융",
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
    category: "시사",
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
