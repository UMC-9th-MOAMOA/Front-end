import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  policyAgreed: boolean | null;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setPolicyAgreed: (value: boolean | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      policyAgreed: null,

      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setLoading: (value) => set({ isLoading: value }),
      setPolicyAgreed: (value) => set({ policyAgreed: value }),
    }),
    {
      name: "auth",
      partialize: (state) => ({ policyAgreed: state.policyAgreed }),
    }
  )
);
