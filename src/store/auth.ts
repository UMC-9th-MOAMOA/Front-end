import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,

  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setLoading: (value) => set({ isLoading: value }),

  logout: () => {
    set({ isAuthenticated: false });
  },
}));
