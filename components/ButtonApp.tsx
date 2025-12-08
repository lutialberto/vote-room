import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";

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
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === "secondary" && styles.secondaryButton,
        type === "cancel" && styles.cancelButton,
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
    backgroundColor: "#0186FF",
    marginHorizontal: "auto",
  },
  secondaryButton: {
    backgroundColor: "#34C759",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
});
