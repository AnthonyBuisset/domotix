import defaultTheme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "usehooks-ts";

export const useScreen = () => ({
  sm: useMediaQuery(`(min-width: ${defaultTheme.screens.sm})`),
  md: useMediaQuery(`(min-width: ${defaultTheme.screens.md})`),
  lg: useMediaQuery(`(min-width: ${defaultTheme.screens.lg})`),
  xl: useMediaQuery(`(min-width: ${defaultTheme.screens.xl})`),
  ["2xl"]: useMediaQuery(`(min-width: ${defaultTheme.screens["2xl"]})`),
});
