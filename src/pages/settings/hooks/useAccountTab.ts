import { useState } from "react";

export type AccountTabKey = "info" | "password";

export default function useAccountTab(defaultTab: AccountTabKey = "info") {
  const [tab, setTab] = useState<AccountTabKey>(defaultTab);
  return { tab, setTab };
}
