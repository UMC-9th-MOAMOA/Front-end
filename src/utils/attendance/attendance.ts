import { getToday } from "../date";

const ATTENDANCE_CACHE_KEY = "lastAttendanceDate";

export const attendanceCache = {
  hasCheckedToday: (): boolean => {
    const lastDate = localStorage.getItem(ATTENDANCE_CACHE_KEY);
    return lastDate === getToday();
  },

  markChecked: () => {
    localStorage.setItem(ATTENDANCE_CACHE_KEY, getToday());
  },
};

export const getWeeklyAttendance = (streak: number): boolean[] => {
  const weeklyStreak = ((streak - 1) % 7) + 1;
  return Array.from({ length: 7 }, (_, i) => i < weeklyStreak);
};
