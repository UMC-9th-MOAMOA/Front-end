export interface AttendanceCheckResponse {
  date: string;
  attendedToday: boolean;
  streak: number;
  completed7: boolean;
}

export interface AttendanceStreakResponse {
  streak: number;
}
