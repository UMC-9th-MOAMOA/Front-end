import { useQuery } from "@tanstack/react-query";
import { getInterests } from "@/apis/interests/interests";

export const useInterests = () => {
  return useQuery({
    queryKey: ["interests"],
    queryFn: getInterests,
  });
};
