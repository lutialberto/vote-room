import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CardApp } from "./CardApp";

interface FormStepCardProps {
  stepNumber: number;
  instructions: string;
}

export default function FormStepCard({
  stepNumber,
  instructions,
}: FormStepCardProps) {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <CardApp style={styles.instructionsContainer}>
      <View style={[styles.stepIndicator, { backgroundColor: primaryColor }]}>
        <ThemedText style={styles.stepNumber}>{stepNumber}</ThemedText>
      </View>
      <ThemedText style={styles.instructions}>{instructions}</ThemedText>
    </CardApp>
  );
}

const styles = StyleSheet.create({
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
