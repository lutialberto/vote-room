import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ColorScheme } from "@/constants/Colors";

export function CardApp(props: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  type?: "default" | "withShadow";
}) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <ThemedView
      style={[
        styles.container,
        props.type === "withShadow" && styles.withShadow,
        props.style,
      ]}
    >
      {props.children}
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      borderRadius: 12,
      padding: 16,
      backgroundColor: colors.cardBackground,
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
      margin: 4,
    },
  });
