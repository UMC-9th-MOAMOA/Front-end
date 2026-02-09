import { useQuery } from "@tanstack/react-query";
import { getSpaceCalendarDay } from "@/apis/calendar/calendar";

export const useSpaceCalendarDay = (date: string) => {
  return useQuery({
    queryKey: ["space", "calendar", "day", date],
    queryFn: () => getSpaceCalendarDay(date),
    keepPreviousData: true,
  });
};
