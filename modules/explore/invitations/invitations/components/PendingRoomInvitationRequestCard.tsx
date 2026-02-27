import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";

export interface PendingRoomInvitationRequestCardProps {
  roomName: string;
  roomDescription: string;
  invitationDate: Date;
  onAccept: () => void;
  onReject: () => void;
}

export function PendingRoomInvitationRequestCard({
  roomName,
  roomDescription,
  invitationDate,
  onAccept,
  onReject,
}: PendingRoomInvitationRequestCardProps) {
  return (
    <ThemedView style={styles.card}>
      <View>
        <ThemedText type="subtitle">{roomName}</ThemedText>
        <ThemedText>{roomDescription}</ThemedText>
      </View>
      <ThemedText type="hint">
        Invitado el{" "}
        {invitationDate.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </ThemedText>

      <View style={styles.actions}>
        <ButtonApp
          label="Rechazar"
          type="cancel"
          style={{ flex: 1 }}
          onPress={onReject}
        />

        <ButtonApp
          label="Aceptar"
          type="primary"
          style={{ flex: 1 }}
          onPress={onAccept}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 4,
    gap: 12,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
});
