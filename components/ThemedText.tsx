import { Text, type TextProps, StyleSheet } from "react-native";

import { ColorName, useThemeColor } from "@/hooks/useThemeColor";

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
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName
  );
  const primaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? { ...styles.link, color: primaryColor } : undefined,
        type === "hint" ? styles.hint : undefined,
        type === "inputError" ? styles.inputError : undefined,
        type === "inputLabel" ? styles.inputLabel : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
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
