import { Text, type TextProps, StyleSheet } from "react-native";

import { ColorName, useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: ColorName;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "inputError"
    | "inputLabel"
    | "hint";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  colorName = "text",
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <Text
      style={[
        { color: colors[colorName] },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "hint" ? styles.hint : undefined,
        type === "inputError" ? styles.inputError : undefined,
        type === "inputLabel" ? styles.inputLabel : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    default: {
      fontSize: 16,
    },
    defaultSemiBold: {
      fontSize: 16,
      fontWeight: "600",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      fontSize: 16,
      color: colors.primary,
    },
    inputError: {
      fontSize: 12,
      color: "red",
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "800",
      color: "gray",
      textTransform: "uppercase",
    },
    hint: {
      fontSize: 12,
      opacity: 0.6,
    },
  });
