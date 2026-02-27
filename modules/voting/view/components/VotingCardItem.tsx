import { StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CardApp } from "@/components/CardApp";
import { ThemedText } from "@/components/ThemedText";
import { BaseVoting, VotingStatus } from "../../models/Voting";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { IconApp } from "@/components/IconApp";
import VotingStatusLabel from "../../components/VotingStatusLabel";

export default function VotingCardItem(props: BaseVoting) {
  const { currentUser } = useAuthenticatedUser();

  const navigateToVoting = () => {
    router.push(`/dashboard/myVotings/${props.id}`);
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
        </View>

        <ThemedText style={styles.votingDescription} numberOfLines={2}>
          {props.description}
        </ThemedText>

        <View style={styles.cardFooter}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <ThemedText
              colorName={props.owner.id === currentUser.id ? "orange" : "text"}
              style={styles.roleText}
            >
              {props.owner.id === currentUser.id ? "Propietario" : "Miembro"}
            </ThemedText>
            <VotingStatusLabel status={props.status} />
          </View>
          {props.roomCode && (
            <View style={styles.row}>
              <IconApp name="people" size={14} colorName="primary" />
              <ThemedText style={styles.roleText}>{props.roomCode}</ThemedText>
            </View>
          )}
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
