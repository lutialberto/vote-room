import { ThemedText } from "@/components/ThemedText";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View, StyleSheet } from "react-native";

export default function HorizontalDivider() {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <View style={styles.divider}>
      <View style={styles.line} />
      <ThemedText style={styles.orText}>o</ThemedText>
      <View style={styles.line} />
    </View>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    orText: {
      marginHorizontal: 16,
      fontSize: 16,
      opacity: 0.5,
    },
  });
