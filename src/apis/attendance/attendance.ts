import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type {
  AttendanceCheckResponse,
  AttendanceStreakResponse,
} from "@/types/attendance/attendance";

export const checkAttendance = () =>
  authAPI.post<ApiResponse<AttendanceCheckResponse>>("/attendance/check");

export const getAttendanceStreak = () =>
  authAPI.get<ApiResponse<AttendanceStreakResponse>>("/attendance/week");
