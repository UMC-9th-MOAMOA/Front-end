export type WalletHistoryTab = "ALL" | "EARN" | "USE";
export type WalletHistorySort = "RECENT" | "OLDEST";
export type WalletHistoryPeriod = "ALL" | "THREE_MONTHS" | "SIX_MONTHS";
export type WalletHistoryEarnSource = "ALL" | "MISSION" | "ATTENDANCE";

export interface WalletHistoryParams {
  tab: WalletHistoryTab;
  sort: WalletHistorySort;
  period: WalletHistoryPeriod;
  earnSource: WalletHistoryEarnSource;
  page: number;
  size: number;
}

export interface WalletHistoryItem {
  walletHistoryId: number;
  type: string;
  amount: number;
  createdAt: string;
  title: string | null;
  categoryLabel: string | null;
  itemType: string | null;
}

export interface WalletHistoryResult {
  balance: number;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: WalletHistoryItem[];
}
