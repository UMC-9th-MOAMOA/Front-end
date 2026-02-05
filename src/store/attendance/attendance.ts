import { create } from "zustand";

export interface AttendanceData {
  streak: number;
  completed7: boolean;
}

interface AttendanceStore {
  showModal: boolean;
  attendanceData: AttendanceData | null;
  setShowModal: (show: boolean) => void;
  setAttendanceData: (data: AttendanceData) => void;
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  showModal: false,
  attendanceData: null,
  setShowModal: (show) => set({ showModal: show }),
  setAttendanceData: (data) => set({ attendanceData: data }),
}));
