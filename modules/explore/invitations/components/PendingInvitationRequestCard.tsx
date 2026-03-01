import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { PendingInvitationRequest } from "../models/PendingInvitationRequest";
import { IconApp } from "@/components/IconApp";
import { ENTITY_TYPE_DATA } from "@/modules/entities/contants";

export interface PendingInvitationRequestCardProps {
  item: PendingInvitationRequest;
  onAccept: () => void;
  onReject: () => void;
}

export function PendingInvitationRequestCard({
  item,
  onAccept,
  onReject,
}: PendingInvitationRequestCardProps) {
  const { name, description, invitationDate, entityType } = item;
  return (
    <ThemedView style={styles.card}>
      <View>
        <ThemedText type="subtitle">{name}</ThemedText>
        <ThemedText>{description}</ThemedText>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <IconApp name={ENTITY_TYPE_DATA[entityType].icon} size={16} />
        <ThemedText type="hint">
          Invitado el{" "}
          {invitationDate.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </ThemedText>
      </View>

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
