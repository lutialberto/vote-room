import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CardApp } from "./CardApp";
import { ColorScheme } from "@/constants/Colors";

interface FormStepCardProps {
  stepNumber: number;
  instructions: string;
}

export default function FormStepCard({
  stepNumber,
  instructions,
}: FormStepCardProps) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <CardApp style={styles.instructionsContainer}>
      <View style={styles.stepIndicator}>
        <ThemedText style={styles.stepNumber}>{stepNumber}</ThemedText>
      </View>
      <ThemedText style={styles.instructions}>{instructions}</ThemedText>
    </CardApp>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    instructionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },
    stepIndicator: {
      borderRadius: 20,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      backgroundColor: colors.primary,
    },
    stepNumber: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    instructions: {
      flex: 1,
      fontSize: 15,
      lineHeight: 20,
    },
  });
