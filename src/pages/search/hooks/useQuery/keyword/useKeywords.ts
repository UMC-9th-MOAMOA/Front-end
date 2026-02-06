import { useSuspenseQuery } from "@tanstack/react-query";
import { getKeywords } from "@/apis/keyword/keyword";

export const useKeywords = () => {
  return useSuspenseQuery({
    queryKey: ["keywords"],
    queryFn: getKeywords,
  });
};
