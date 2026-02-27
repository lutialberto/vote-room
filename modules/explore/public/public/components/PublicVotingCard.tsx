import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { CardApp } from "@/components/CardApp";
import { TagApp } from "@/components/TagApp";
import { IconApp } from "@/components/IconApp";
import { BaseVoting } from "@/modules/voting/models/Voting";
import VotingStatusLabel from "@/modules/voting/components/VotingStatusLabel";
import RoomCodeLabel from "@/modules/rooms/components/RoomCodeLabel";

export interface PublicVotingCardProps {
  votingData: BaseVoting;
  onJoin: () => void;
}

export default function PublicVotingCard({
  votingData,
  onJoin,
}: PublicVotingCardProps) {
  return (
    <CardApp type="withShadow" style={{ gap: 8, padding: 8 }}>
      <View>
        <ThemedText type="subtitle">{votingData.question}</ThemedText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText type="hint">por {votingData.owner.userName}</ThemedText>
          <VotingStatusLabel status={votingData.status} />
        </View>
      </View>

      <ThemedText numberOfLines={3}>{votingData.description}</ThemedText>

      <View style={styles.infoRow}>
        <View style={styles.roomInfo}>
          {votingData.roomCode && <RoomCodeLabel code={votingData.roomCode} />}
        </View>
        <ButtonApp
          label="Unirse"
          type="primary"
          icon="people"
          style={styles.joinButton}
          onPress={onJoin}
        />
      </View>
    </CardApp>
  );
}

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roomName: {
    fontSize: 12,
    opacity: 0.7,
  },
  joinButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginHorizontal: 0,
  },
});
