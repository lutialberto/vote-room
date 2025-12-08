/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const primary = "#0186FF";
const secondary = "#34C759";
const cancel = "#FF3B30";

const orange = "#FFA500";
const green = "#34C759";
const gray = "#8E8E93";
const red = "#FF3B30";
const border = "#e0e0e0";

const commonColors = {
  primary,
  secondary,
  cancel,
  orange,
  green,
  gray,
  red,
  border,
};

interface ColorScheme {
  primary: string;
  secondary: string;
  cancel: string;
  orange: string;
  green: string;
  gray: string;
  red: string;
  border: string;
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  cardBackground: string;
}

export const Colors: { light: ColorScheme; dark: ColorScheme } = {
  light: {
    ...commonColors,
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#666",
    tabIconDefault: "#666",
    tabIconSelected: tintColorLight,
    cardBackground: "#F7F9FA",
  },
  dark: {
    ...commonColors,
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#666",
    tabIconDefault: "#666",
    tabIconSelected: tintColorDark,
    cardBackground: "#1E2021",
  },
};
