import { useCallback, useState } from "react";
import type { MyPageTopTabKey } from "../types/mypage.type";

export function useMyPageTab(initial: MyPageTopTabKey = "all") {
  const [activeTab, setActiveTab] = useState<MyPageTopTabKey>(initial);

  const changeTab = useCallback((tab: MyPageTopTabKey) => {
    setActiveTab(tab);
  }, []);

  return { activeTab, changeTab, setActiveTab };
}
