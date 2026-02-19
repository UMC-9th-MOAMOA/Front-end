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
  reset: () => void;
}

// reset() 호출 시 복원할 초기값
const initialState = {
  showModal: false,
  attendanceData: null,
  onModalClosed: null,
};

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  ...initialState,
  setShowModal: (show) => set({ showModal: show }),
  setAttendanceData: (data) => set({ attendanceData: data }),
  setOnModalClosed: (callback) => set({ onModalClosed: callback }),
  reset: () => set(initialState),
}));
