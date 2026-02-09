import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSpaceCalendarDay } from "@/apis/calendar/calendar";
import type { SpaceCalendarDayResult } from "@/types/calendar/spaceCalendar";

export const useSpaceCalendarDay = (date: string) => {
  return useQuery<SpaceCalendarDayResult>({
    queryKey: ["space", "calendar", "day", date],
    queryFn: () => getSpaceCalendarDay(date),
    placeholderData: keepPreviousData,
  });
};
