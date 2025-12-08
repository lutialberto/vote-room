import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View, StyleSheet } from "react-native";

export default function HorizontalDivider() {
  const lineColor = useThemeColor({}, "border");

  return (
    <View style={styles.divider}>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      <ThemedText style={styles.orText}>o</ThemedText>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 16,
    opacity: 0.5,
  },
});
