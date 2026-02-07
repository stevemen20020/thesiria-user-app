import { create } from "zustand";

type AuthState = {
  token: string | null;
  isLoading: boolean;
  setToken: (t: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoading: false,
  setToken: (token) => set({ token, isLoading: false }),
}));
