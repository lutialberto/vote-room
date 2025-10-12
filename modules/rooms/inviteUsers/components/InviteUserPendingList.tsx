import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PendingInvitation } from "../models/PendingInvitation";
import { UserInvitationType } from "../models/UserInvitationType";
import { USER_INVITATIONS } from "../constants/userInvitations";
import { ButtonApp } from "@/components/ButtonApp";

export default function InviteUserPendingList({
  pendingInvitations,
  removeInvitation,
}: {
  pendingInvitations: PendingInvitation[];
  removeInvitation: (id: string) => void;
}) {
  return (
    <>
      <View style={styles.pendingHeader}>
        <Ionicons name="send" size={20} color="#0186FF" />
        <ThemedText type="subtitle">
          Invitaciones pendientes ({pendingInvitations.length})
        </ThemedText>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pendingInvitations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.invitationsList}
        ListEmptyComponent={() => (
          <ThemedText style={{ textAlign: "center" }}>
            No hay invitaciones pendientes
          </ThemedText>
        )}
        renderItem={({ item }) => (
          <View style={styles.invitationItem}>
            <View style={styles.invitationInfo}>
              <Ionicons
                name={USER_INVITATIONS[item.type].icon}
                size={20}
                color="#666"
              />
              <View style={styles.invitationText}>
                <ThemedText>{USER_INVITATIONS[item.type].label}</ThemedText>
                <ThemedText type="defaultSemiBold">{item.value}</ThemedText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removeInvitation(item.id)}
              style={styles.removeButton}
            >
              <Ionicons name="close" size={20} color="#0186FF" />
            </TouchableOpacity>
          </View>
        )}
      />
      {pendingInvitations.length > 0 ? (
        <ButtonApp
          label="Enviar todas"
          style={styles.sendAllButton}
          onPress={() => {
            // Lógica para enviar todas las invitaciones
          }}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  pendingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },
  invitationsList: {
    gap: 12,
    marginBottom: 20,
  },
  invitationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
  },
  invitationInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  invitationText: {
    flex: 1,
  },
  removeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#e9ecef",
  },
  sendAllButton: {
    margin: 16,
  },
});
