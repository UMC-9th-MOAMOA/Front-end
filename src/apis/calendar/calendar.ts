import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { CalendarDayResult, CalendarMonthResult } from "@/types/calendar/calendar";
import { toApiError } from "@/utils/apiError";

export const getSpaceCalendarDay = async (date: string) => {
  const { data } = await authAPI.get<ApiResponse<CalendarDayResult>>(
    "/space/calendar/day",
    { params: { date } }
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};

export const getSpaceCalendarMonth = async (year: number, month: number) => {
  const { data } = await authAPI.get<ApiResponse<CalendarMonthResult>>(
    "/space/calendar/calendar",
    { params: { year, month } }
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};
