import { useRef, useState } from "react";
import { getGoalPopups } from "@/apis/goal/goal";
import type { GoalPopup } from "@/types/goal/goal";
import { useMarkGoalPopupShown } from "./useMarkGoalPopupShown";

export const useGoalPopupCheck = () => {
  const [popupQueue, setPopupQueue] = useState<GoalPopup[]>([]);
  const [currentPopup, setCurrentPopup] = useState<GoalPopup | null>(null);
  const [shouldNavigateToSearch, setShouldNavigateToSearch] = useState(false);
  const isCheckingRef = useRef(false);
  const markShownMutation = useMarkGoalPopupShown();

  const handleCheckGoalPopups = async () => {
    // 이미 체크 중이거나 팝업이 표시 중이면 중복 호출 방지
    if (isCheckingRef.current || popupQueue.length > 0) return;

    isCheckingRef.current = true;
    try {
      const result = await getGoalPopups();

      if (result.popups.length > 0) {
        setPopupQueue(result.popups);
        setCurrentPopup(result.popups[0]);
      }
    } catch (error) {
      console.error("Goal popups 조회 실패:", error);
    } finally {
      isCheckingRef.current = false;
    }
  };

  const closePopupWithAction = async (navigateToSearch = false) => {
    if (!currentPopup) return;

    try {
      await markShownMutation.mutateAsync(currentPopup.goalResultId);

      const remainingPopups = popupQueue.filter(
        (p) => p.goalResultId !== currentPopup.goalResultId
      );

      if (navigateToSearch) {
        setShouldNavigateToSearch(true);
      }

      if (remainingPopups.length > 0) {
        setPopupQueue(remainingPopups);
        setCurrentPopup(remainingPopups[0]);
      } else {
        setPopupQueue([]);
        setCurrentPopup(null);
      }
    } catch (error) {
      console.error("Goal popup 확인 처리 실패:", error);
      setCurrentPopup(null);
      setPopupQueue([]);
    }
  };

  const handleClosePopup = () => closePopupWithAction(false);
  const handleMissionExplore = () => closePopupWithAction(true);

  const resetNavigateToSearch = () => {
    setShouldNavigateToSearch(false);
  };

  // 로그아웃 시 이전 세션의 팝업 큐 초기화
  const resetGoalPopups = () => {
    setPopupQueue([]);
    setCurrentPopup(null);
    setShouldNavigateToSearch(false);
    isCheckingRef.current = false;
  };

  return {
    currentPopup,
    shouldNavigateToSearch,
    handleCheckGoalPopups,
    handleClosePopup,
    handleMissionExplore,
    resetNavigateToSearch,
    resetGoalPopups,
  };
};
