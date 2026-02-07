import { useSuspenseQuery } from "@tanstack/react-query";
import { getSettingInterestsWithDetails } from "@/apis/interests/settingInterests";

export const useSettingInterests = () => {
  return useSuspenseQuery({
    queryKey: ["settings", "interests", "with-details"],
    queryFn: getSettingInterestsWithDetails,
  });
};
