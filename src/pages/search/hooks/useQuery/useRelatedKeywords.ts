import { useSuspenseQuery } from "@tanstack/react-query";
import { getRelatedKeywords } from "@/apis/search/search";

export const useRelatedKeywords = (keyword: string) => {
  return useSuspenseQuery({
    queryKey: ["keywords", "related", keyword],
    queryFn: () => getRelatedKeywords(keyword),
  });
};
