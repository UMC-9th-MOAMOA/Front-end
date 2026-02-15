import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BgmStore {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export const useBgmStore = create<BgmStore>()(
  persist(
    (set) => ({
      enabled: true,
      setEnabled: (enabled) => set({ enabled }),
    }),
    { name: "bgm-storage" }
  )
);
