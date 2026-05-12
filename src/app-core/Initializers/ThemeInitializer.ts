import { DARK_COLORS, LIGHT_COLORS } from "@/src/shared/constants/Theme";
import { useEffect } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { useThemeStore } from "../Store/themeStore";

const ThemeInitializer = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const colors = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

    EStyleSheet.build({
      $rem: 16,

      $primary: colors.primary,
      $background: colors.background,
      $text: colors.textPrimary,
      $surface: colors.surface,
    });
  }, [theme]);

  return null;
};

export default ThemeInitializer;
