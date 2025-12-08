import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { PendingInvitation } from "../models/PendingInvitation";
import { USER_INVITATIONS } from "../constants/userInvitations";
import { ButtonApp } from "@/components/ButtonApp";
import { IconApp } from "@/components/IconApp";
import { CardApp } from "@/components/CardApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";

export default function InviteUserPendingList({
  pendingInvitations,
  removeInvitation,
}: {
  pendingInvitations: PendingInvitation[];
  removeInvitation: (id: string) => void;
}) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <>
      <View style={styles.pendingHeader}>
        <IconApp name="send" size={20} colorName="primary" />
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

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
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
      marginVertical: 8,
      marginHorizontal: 16,
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
    sendAllButton: {
      margin: 16,
    },
  });
