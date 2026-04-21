import { useColorScheme } from "react-native";
import { lightTheme } from "../constants/theme/lightTheme";
import { darkTheme } from "../constants/theme/darkTheme";
import { useThemeStore } from "../store/themeStore";

export function useTheme() {
  const systemTheme = useColorScheme();
  const selectedTheme = useThemeStore((state) => state.theme);

  if (selectedTheme === "light") return lightTheme;
  if (selectedTheme === "dark") return darkTheme;

  return systemTheme === "dark" ? darkTheme : lightTheme;
}