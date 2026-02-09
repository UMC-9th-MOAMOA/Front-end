import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getMyWalletHistory } from "@/apis/wallet/wallet";
import type {
  WalletHistoryEarnSource,
  WalletHistoryPeriod,
  WalletHistorySort,
  WalletHistoryTab,
} from "@/types/wallet/walletHistory";

const PAGE_SIZE = 10;

interface UseMyWalletHistoryParams {
  tab: WalletHistoryTab;
  sort: WalletHistorySort;
  period: WalletHistoryPeriod;
  earnSource: WalletHistoryEarnSource;
}

export const useMyWalletHistory = (params: UseMyWalletHistoryParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["wallet", "me", "history", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getMyWalletHistory({
        ...params,
        page: pageParam,
        size: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });
};
