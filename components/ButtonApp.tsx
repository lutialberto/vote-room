import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";

export type ButtonAppProps = TouchableOpacityProps & {
  type?: "primary" | "secondary" | "cancel";
  label: string;
  labelStyle?: TextStyle;
};

export function ButtonApp({
  style,
  label,
  labelStyle,
  type = "primary",
  ...otherProps
}: ButtonAppProps) {
  const colors = useThemeColor();
  const styles = getStyles(colors);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === "secondary" && { backgroundColor: colors.secondary },
        type === "cancel" && { backgroundColor: colors.cancel },
        style,
      ]}
      {...otherProps}
    >
      <ThemedText style={labelStyle}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 24,
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: "row",
      marginHorizontal: "auto",
      backgroundColor: colors.primary,
    },
  });
