import { useMutation } from "@tanstack/react-query";
import {
  checkAttendance,
  getAttendanceStreak,
} from "@/apis/attendance/attendance";
import { useAttendanceStore } from "@/store/attendance/attendance";
import type { ApiError } from "@/types/api/api";
import { attendanceCache } from "@/utils/attendance/attendance";

export const useAttendanceCheck = () => {
  const { setShowModal, setAttendanceData, attendanceData } =
    useAttendanceStore();

  const checkMutation = useMutation({
    mutationFn: checkAttendance,
    onSuccess: (response) => {
      attendanceCache.markChecked();
      const result = response.data.result;
      setAttendanceData({
        streak: result.streak,
        completed7: result.completed7,
      });

      setShowModal(true);
    },
    onError: async (error: ApiError) => {
      if (error.serverCode === "ATTENDANCE409_1") {
        attendanceCache.markChecked();
        try {
          const response = await getAttendanceStreak();
          setAttendanceData({
            streak: response.data.result.streak,
            completed7: false,
          });
        } catch (error) {
          console.error("출석 정보 가져오기 실패: ", error);
        }
      }
    },
  });

  const handleCheckAttendance = async () => {
    // 이미 오늘 체크했지만 store에 데이터가 없는 경우 (앱 재시작)
    if (attendanceCache.hasCheckedToday() && !attendanceData) {
      try {
        const response = await getAttendanceStreak();
        setAttendanceData({
          streak: response.data.result.streak,
          completed7: false,
        });
      } catch (error) {
        console.error("출석 정보 가져오기 실패 (앱 재시작): ", error);
      }
      return;
    }

    if (attendanceCache.hasCheckedToday() || checkMutation.isPending) {
      return;
    }
    checkMutation.mutate();
  };

  return { handleCheckAttendance };
};
