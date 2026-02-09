export type CalendarDayItem = {
  type: string;
  amount: number;
  occurredAt: string;
  missionTitle?: string | null;
  missionDurationMinutes?: number | null;
};

export type CalendarDayResult = {
  date: string;
  items: CalendarDayItem[];
  totalMinutes: number;
  totalAcorns: number;
};

export type CalendarMonthResult = {
  attendedDays: number[];
  missionRewardDays: number[];
};

