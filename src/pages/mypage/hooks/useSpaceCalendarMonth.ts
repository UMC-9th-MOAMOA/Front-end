import { useQuery } from "@tanstack/react-query";
import { getSpaceCalendarMonth } from "@/apis/calendar/calendar";

export const useSpaceCalendarMonth = (year: number, month: number) => {
  return useQuery({
    queryKey: ["space", "calendar", "month", year, month],
    queryFn: () => getSpaceCalendarMonth(year, month),
    keepPreviousData: true,
  });
};
