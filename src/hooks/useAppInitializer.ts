import { useCallback, useEffect, useRef } from "react";
import { storage } from "@/apis/storage";
import { useAttendanceStore } from "@/store/attendance/attendance";
import { useAuthStore } from "@/store/auth";

interface UseAppInitializerProps {
  onCheckAttendance: () => Promise<boolean>;
  onCheckGoalPopups: () => void;
  onReset: () => void;
}

export const useAppInitializer = ({
  onCheckAttendance,
  onCheckGoalPopups,
  onReset,
}: UseAppInitializerProps) => {
  // 매 렌더마다 최신 콜백을 유지 (stale closure 방지)
  const callbacksRef = useRef({ onCheckAttendance, onCheckGoalPopups, onReset });
  callbacksRef.current = { onCheckAttendance, onCheckGoalPopups, onReset };

  // 동시 실행 방지 플래그
  const isRunningRef = useRef(false);

  // 출석 체크 → 모달 → 골 팝업 순서로 체이닝 실행
  // useCallback: 무한 재실행 방지
  const runChecks = useCallback(async () => {
    if (!storage.getToken()) return;
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    try {
      const modalShown = await callbacksRef.current.onCheckAttendance();

      if (modalShown) {
        // 출석 모달을 닫을 때 골 팝업 체이닝
        useAttendanceStore
          .getState()
          .setOnModalClosed(() => callbacksRef.current.onCheckGoalPopups());
      } else {
        // 출석 모달 없으면 바로 골 팝업 (이미 체이닝 중이면 스킵)
        if (!useAttendanceStore.getState().onModalClosed) {
          callbacksRef.current.onCheckGoalPopups();
        }
      }
    } catch (error) {
      console.error("출석 체크 실패:", error);
    } finally {
      isRunningRef.current = false;
    }
  }, []);

  useEffect(() => {
    // 로그아웃 시 이전 세션 스토어 초기화
    const unsubAuth = useAuthStore.subscribe((state, prevState) => {
      if (prevState.isAuthenticated && !state.isAuthenticated) {
        useAttendanceStore.getState().reset();
        callbacksRef.current.onReset();
      }
    });

    // 탭 전환 후 포그라운드 복귀 시 다시 체크
    const onVisible = () => {
      if (document.visibilityState === "visible") runChecks();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      unsubAuth();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [runChecks]);

  return { runChecks };
};
