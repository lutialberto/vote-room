import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";
import { CardApp } from "@/components/CardApp";

export interface OnBoardingStepProps {
  title: string;
  descriptions: string[];
}

export default function OnBoardingStep({
  title,
  descriptions,
}: OnBoardingStepProps) {
  return (
    <CardApp style={styles.card}>
      <View style={styles.cardContent}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          {title}
        </ThemedText>
        {descriptions.map((desc, index) => (
          <ThemedText key={index} style={styles.cardDescription}>
            {desc}
          </ThemedText>
        ))}
      </View>
    </CardApp>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
  },
  cardContent: {
    padding: 16,
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    textAlign: "center",
  },
  cardDescription: {
    textAlign: "center",
  },
});
