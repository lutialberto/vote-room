import { ThemedText } from "@/components/ThemedText";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { PendingInvitation } from "../models/PendingInvitation";
import { USER_INVITATIONS } from "../constants/userInvitations";
import { ButtonApp } from "@/components/ButtonApp";
import { IconApp } from "@/components/IconApp";
import { CardApp } from "@/components/CardApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { createPendingRoomInvitationsRequest } from "../../exploreRooms/invitations/services/pendingRoomInvitationRequestService";

export default function InviteUserPendingList({
  roomId,
  pendingInvitations,
  removeInvitation,
}: {
  roomId: string;
  pendingInvitations: PendingInvitation[];
  removeInvitation: (id: string) => void;
}) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const { execPromise: fnCreatePendingInvitations, isWaiting } = useWaitingApp<
    {
      invitations: PendingInvitation[];
      roomId: string;
    },
    boolean
  >({
    functionToWait: (data) =>
      createPendingRoomInvitationsRequest(data.invitations, data.roomId),
    success: () => {
      console.log("Invitaciones enviadas con éxito");
      pendingInvitations.forEach((inv) => removeInvitation(inv.id));
    },
    failure: (err) => {
      console.log("Error al enviar invitaciones:", err);
      Alert.alert(
        "Error",
        "No se pudieron enviar las invitaciones: " + err.message
      );
    },
  });

  return (
    <>
      <View style={styles.pendingHeader}>
        {pendingInvitations.length > 0 && (
          <ButtonApp
            label={`Enviar Invitaciones pendientes (${pendingInvitations.length})`}
            onPress={() =>
              fnCreatePendingInvitations({
                invitations: pendingInvitations,
                roomId,
              })
            }
          />
        )}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pendingInvitations}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <ThemedText style={{ textAlign: "center" }}>
            No hay invitaciones pendientes
          </ThemedText>
        )}
        renderItem={({ item }) => (
          <CardApp type="withShadow" style={styles.invitationItem}>
            <View style={styles.invitationInfo}>
              <IconApp name={USER_INVITATIONS[item.type].icon} size={20} />
              <View style={styles.invitationText}>
                <ThemedText>{USER_INVITATIONS[item.type].label}</ThemedText>
                <ThemedText type="defaultSemiBold">{item.value}</ThemedText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removeInvitation(item.id)}
              style={styles.removeButton}
            >
              <IconApp name="close" size={20} colorName="primary" />
            </TouchableOpacity>
          </CardApp>
        )}
      />
    </>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    pendingHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 6,
      gap: 8,
    },
    invitationItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
      backgroundColor: colors.primary + "20",
    },
  });
