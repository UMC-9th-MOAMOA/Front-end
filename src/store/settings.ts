import { create } from "zustand";

interface SettingsStore {
  showLogoutToast: boolean;
  showWithdrawSuccessModal: boolean;
  setShowLogoutToast: (value: boolean) => void;
  setShowWithdrawSuccessModal: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  showLogoutToast: false,
  showWithdrawSuccessModal: false,
  setShowLogoutToast: (value) => set({ showLogoutToast: value }),
  setShowWithdrawSuccessModal: (value) => set({ showWithdrawSuccessModal: value }),
}));
