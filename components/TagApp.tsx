import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";

export function TagApp(props: { tag: string }) {
  const colors = useThemeColor();
  const styles = getStyles(colors);
  return (
    <View style={styles.tag}>
      <ThemedText colorName="primary" style={styles.tagText}>
        #{props.tag}
      </ThemedText>
    </View>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    tag: {
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 4,
      backgroundColor: colors.primary + "20",
    },
    tagText: {
      fontSize: 12,
    },
  });
