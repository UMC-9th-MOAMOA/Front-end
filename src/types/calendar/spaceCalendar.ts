export interface SpaceCalendarMonthResult {
  attendedDays: number[];
  missionRewardDays: number[];
}

export interface SpaceCalendarDayItem {
  type: string;
  amount: number;
  occurredAt: string;
  missionId?: number | null;
  missionTitle?: string | null;
  missionDurationMinutes?: number | null;
}

export interface SpaceCalendarDayResult {
  date: string;
  items: SpaceCalendarDayItem[];
  totalMinutes: number;
  totalAcorns: number;
}
