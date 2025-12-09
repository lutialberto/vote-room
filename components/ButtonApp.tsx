import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";
import { IconApp, IconName } from "./IconApp";

export type ButtonAppProps = TouchableOpacityProps & {
  type?: "primary" | "secondary" | "cancel";
  label: string;
  labelStyle?: TextStyle;
  icon?: IconName;
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
      <View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
        {otherProps.icon && (
          <IconApp
            name={otherProps.icon}
            size={labelStyle?.fontSize ?? 16}
            color={labelStyle?.color?.toString() ?? colors.text}
          />
        )}
        <ThemedText style={labelStyle}>{label}</ThemedText>
      </View>
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
