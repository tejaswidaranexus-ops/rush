import { create } from "zustand";

type ThemeType = "light" | "dark" | "system";

type ThemeState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "dark", // ✅ FORCE DARK DEFAULT

  setTheme: (theme) => set({ theme }),

  toggleTheme: () => {
    const current = get().theme;
    set({ theme: current === "dark" ? "light" : "dark" });
  },
}));