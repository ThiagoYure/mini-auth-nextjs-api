import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: { uid: string; email: string | null };
  token: string | null;
  login: (user: { uid: string; email: string | null }, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: { uid: "", email: "" },
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: { uid: "", email: "" }, token: null }),
    }),
    { name: "auth-storage" }
  )
);
