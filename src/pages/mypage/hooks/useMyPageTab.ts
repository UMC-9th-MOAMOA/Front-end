import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { MyPageTopTabKey } from "../types/mypage.type";

export function useMyPageTab(initial: MyPageTopTabKey = "all") {
  const VALID_TABS: MyPageTopTabKey[] = ["all", "mission", "acorn"];
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab =
    tabParam && VALID_TABS.includes(tabParam as MyPageTopTabKey)
      ? (tabParam as MyPageTopTabKey)
      : initial;
  const [activeTab, setActiveTab] = useState<MyPageTopTabKey>(initialTab);

  const changeTab = useCallback((tab: MyPageTopTabKey) => {
    setActiveTab(tab);
  }, []);

  return { activeTab, changeTab, setActiveTab };
}
