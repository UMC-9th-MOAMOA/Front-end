import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyWalletBalance } from "@/apis/wallet/wallet";

export const useMyWalletBalance = () => {
  return useSuspenseQuery({
    queryKey: ["wallet", "me", "balance"],
    queryFn: getMyWalletBalance,
  });
};
