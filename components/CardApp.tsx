import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export function CardApp(props: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  type?: "default" | "withShadow";
}) {
  const color = useThemeColor({}, "cardBackground");
  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: color },
        props.type === "withShadow" && styles.withShadow,
        ,
        props.style,
      ]}
    >
      {props.children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
  },
  withShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
