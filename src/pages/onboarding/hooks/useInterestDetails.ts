import { useQuery } from "@tanstack/react-query";
import { getInterestDetails } from "@/apis/interests/interests";

export const useInterestDetails = (interestId?: number) => {
  return useQuery({
    queryKey: ["interests", "details", interestId],
    queryFn: () => getInterestDetails(interestId as number),
    enabled: typeof interestId === "number",
  });
};
