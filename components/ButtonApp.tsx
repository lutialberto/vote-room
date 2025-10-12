import { StyleSheet, TextStyle, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";

export type ButtonAppProps = TouchableOpacityProps & {
  type?: "primary" | "secondary";
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
});
