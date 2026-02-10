import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/apis/profile/profile";

export const myProfileQueryKey = ["members", "me", "profile"] as const;

export const useMyProfile = () =>
  useSuspenseQuery({
    queryKey: myProfileQueryKey,
    queryFn: getMyProfile,
  });
