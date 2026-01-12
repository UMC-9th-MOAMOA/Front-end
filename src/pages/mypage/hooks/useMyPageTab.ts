// src/pages/mypage/hooks/useMyPageTab.ts
import { useCallback, useState } from "react";
import type { MyPageTopTabKey } from "../types/mypage.type";

export function useMyPageTab(initial: MyPageTopTabKey = "all") {
  const [activeTab, setActiveTab] = useState<MyPageTopTabKey>(initial);

  // 필요하면 여기서 가드/로깅/추가 로직을 한 곳에서 처리 가능
  const changeTab = useCallback((tab: MyPageTopTabKey) => {
    setActiveTab(tab);
  }, []);

  return { activeTab, changeTab, setActiveTab };
}
