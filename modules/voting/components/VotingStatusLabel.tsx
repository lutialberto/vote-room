import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";
import { VotingStatus } from "../models/Voting";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function VotingStatusLabel(props: { status: VotingStatus }) {
  const colors = useThemeColor();
  const statusConfig: Record<VotingStatus, { color: string; text: string }> = {
    closed: { color: colors.red, text: "Cerrada" },
    draft: { color: colors.gray, text: "Borrador" },
    scheduled: { color: colors.orange, text: "Programada" },
    active: { color: colors.green, text: "Activa" },
  };
  const votingStatusConfig = statusConfig[props.status];

  return (
    <View style={styles.statusContainer}>
      <View
        style={[
          styles.statusDot,
          { backgroundColor: votingStatusConfig.color },
        ]}
      />
      <ThemedText style={styles.statusText}>
        {votingStatusConfig.text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
