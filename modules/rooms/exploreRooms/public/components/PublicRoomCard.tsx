import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { CardApp } from "@/components/CardApp";
import { TagApp } from "@/components/TagApp";
import { IconApp } from "@/components/IconApp";

export interface PublicRoomCardProps {
  roomName: string;
  roomDescription: string;
  participantCount: number;
  tags: string[];
  ownerName: string;
  lastActivity: string;
  onJoin: () => void;
}

export default function PublicRoomCard({
  roomName,
  roomDescription,
  participantCount,
  tags,
  ownerName,
  lastActivity,
  onJoin,
}: PublicRoomCardProps) {
  return (
    <CardApp
      type="withShadow"
      style={{ gap: 8, marginVertical: 4, marginHorizontal: 8, padding: 8 }}
    >
      <View>
        <ThemedText type="subtitle">{roomName}</ThemedText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText type="hint">por {ownerName}</ThemedText>
          <ThemedText style={styles.lastActivity}>{lastActivity}</ThemedText>
        </View>
      </View>

      <ThemedText numberOfLines={3}>{roomDescription}</ThemedText>

      {tags?.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <TagApp key={index} tag={tag} />
          ))}
        </View>
      )}

      <View style={styles.infoRow}>
        <View style={styles.participantInfo}>
          <IconApp name="people" size={16} />
          <ThemedText style={styles.participantCount}>
            {participantCount} participantes
          </ThemedText>
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
  participantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  participantCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  lastActivity: {
    fontSize: 12,
    opacity: 0.5,
  },
  joinButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginHorizontal: 0,
  },
});
