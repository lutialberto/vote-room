import { StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CardApp } from "@/components/CardApp";
import { ThemedText } from "@/components/ThemedText";
import { BaseVoting, VotingStatus } from "../../models/Voting";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function VotingCardItem(props: BaseVoting) {
  const {
    green: greenColor,
    orange: orangeColor,
    gray: grayColor,
    red: redColor,
  } = useThemeColor();

  const { currentUser } = useAuthenticatedUser();

  const statusConfig: Record<VotingStatus, { color: string; text: string }> = {
    closed: { color: redColor, text: "Cerrada" },
    draft: { color: grayColor, text: "Borrador" },
    scheduled: { color: orangeColor, text: "Programada" },
    active: { color: greenColor, text: "Activa" },
  };
  const votingStatusConfig = statusConfig[props.status];
  const navigateToVoting = () => {
    router.push(`/(tabs)/myVotings/${props.id}`);
  };

  return (
    <TouchableOpacity
      key={props.id}
      onPress={navigateToVoting}
      activeOpacity={0.7}
    >
      <CardApp type="withShadow">
        <View style={styles.cardHeader}>
          <View style={styles.votingInfo}>
            <ThemedText style={styles.votingTitle}>{props.question}</ThemedText>
          </View>

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
        </View>

        <ThemedText style={styles.votingDescription} numberOfLines={2}>
          {props.description}
        </ThemedText>

        <View style={styles.cardFooter}>
          <ThemedText
            colorName={props.owner.id === currentUser.id ? "orange" : "text"}
            style={styles.roleText}
          >
            {props.owner.id === currentUser.id ? "Propietario" : "Miembro"}
          </ThemedText>
        </View>
      </CardApp>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  votingInfo: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  votingTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
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
  votingDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roleText: {
    fontSize: 12,
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
