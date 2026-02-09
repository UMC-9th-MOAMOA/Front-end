import { useSuspenseQuery } from "@tanstack/react-query";
import { getSpaceCalendarDay } from "@/apis/calendar/calendar";

export const useSpaceCalendarDay = (date: string) => {
  return useSuspenseQuery({
    queryKey: ["space", "calendar", "day", date],
    queryFn: () => getSpaceCalendarDay(date),
  });
};

