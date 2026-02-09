import { useQuery } from "@tanstack/react-query";
import { getSpaceCalendarMonth } from "@/apis/calendar/calendar";
import type { SpaceCalendarMonthResult } from "@/types/calendar/spaceCalendar";

export const useSpaceCalendarMonth = (year: number, month: number) => {
  return useQuery<SpaceCalendarMonthResult>({
    queryKey: ["space", "calendar", "month", year, month],
    queryFn: () => getSpaceCalendarMonth(year, month),
    placeholderData: (prev) => prev,
  });
};
