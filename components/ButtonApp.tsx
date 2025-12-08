import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

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
  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");
  const cancelColor = useThemeColor({}, "cancel");
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: primaryColor },
        type === "secondary" && { backgroundColor: secondaryColor },
        type === "cancel" && { backgroundColor: cancelColor },
        style,
      ]}
      {...otherProps}
    >
      <ThemedText style={labelStyle}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    marginHorizontal: "auto",
  },
});
