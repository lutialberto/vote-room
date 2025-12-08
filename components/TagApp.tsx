import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export function TagApp(props: { tag: string }) {
  const color = useThemeColor({}, "primary");
  return (
    <View style={[styles.tag, { backgroundColor: color + "20" }]}>
      <ThemedText colorName="primary" style={styles.tagText}>
        #{props.tag}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
  },
});
