import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface FormStepCardProps {
  stepNumber: number;
  instructions: string;
}

export default function FormStepCard({
  stepNumber,
  instructions,
}: FormStepCardProps) {
  return (
    <View style={styles.instructionsContainer}>
      <View style={styles.stepIndicator}>
        <ThemedText style={styles.stepNumber}>{stepNumber}</ThemedText>
      </View>
      <ThemedText style={styles.instructions}>{instructions}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  instructionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  stepIndicator: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  instructions: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
});
