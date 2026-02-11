import { useSuspenseQuery } from "@tanstack/react-query";
import { getHome } from "@/apis/home/home";

export const useHome = () => {
  return useSuspenseQuery({
    queryKey: ["home"],
    queryFn: getHome,
    staleTime: 1000 * 60,
  });
};