import { DARK_COLORS, LIGHT_COLORS } from "@/src/shared/constants/Theme";
import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  colors: typeof LIGHT_COLORS;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  colors: LIGHT_COLORS,

  toggleTheme: () => {
    const nextTheme = get().theme === "dark" ? "light" : "dark";

    set({
      theme: nextTheme,
      colors: nextTheme === "dark" ? DARK_COLORS : LIGHT_COLORS,
    });
  },
}));
