import { create } from "zustand";

interface BgmStore {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export const useBgmStore = create<BgmStore>((set) => ({
  enabled: true,
  setEnabled: (enabled) => set({ enabled }),
}));
