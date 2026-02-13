import { create } from "zustand";

export interface AttendanceData {
  streak: number;
  completed7: boolean;
}

interface AttendanceStore {
  showModal: boolean;
  attendanceData: AttendanceData | null;
  onModalClosed: (() => void) | null;
  setShowModal: (show: boolean) => void;
  setAttendanceData: (data: AttendanceData) => void;
  setOnModalClosed: (callback: (() => void) | null) => void;
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  showModal: false,
  attendanceData: null,
  onModalClosed: null,
  setShowModal: (show) => set({ showModal: show }),
  setAttendanceData: (data) => set({ attendanceData: data }),
  setOnModalClosed: (callback) => set({ onModalClosed: callback }),
}));
