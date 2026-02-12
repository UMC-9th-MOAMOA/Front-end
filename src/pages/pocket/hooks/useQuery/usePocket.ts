import { useSuspenseQuery } from "@tanstack/react-query";
import { getPocket } from "@/apis/pocket/pocket";

export const usePocket = () => {
  return useSuspenseQuery({
    queryKey: ["pocket"],
    queryFn: getPocket,
    staleTime: 0,
    gcTime: 0,
  });
};
