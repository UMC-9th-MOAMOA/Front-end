import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { MyPageTopTabKey } from "../types/mypage.type";

export function useMyPageTab(initial: MyPageTopTabKey = "all") {
  const [searchParams] = useSearchParams();
  const initialTab =
    (searchParams.get("tab") as MyPageTopTabKey) ?? initial;
  const [activeTab, setActiveTab] = useState<MyPageTopTabKey>(initialTab);

  const changeTab = useCallback((tab: MyPageTopTabKey) => {
    setActiveTab(tab);
  }, []);

  return { activeTab, changeTab, setActiveTab };
}
