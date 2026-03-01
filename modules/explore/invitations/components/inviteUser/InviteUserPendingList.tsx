import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, FlatList } from "react-native";
import { IconApp } from "@/components/IconApp";
import { CardApp } from "@/components/CardApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";
import {
  PendingInvitationRequest,
  PendingInvitationRequestDetail,
} from "@/modules/explore/invitations/models/PendingInvitationRequest";

export default function InviteUserPendingList({
  entityId,
  entityType,
  pendingInvitations,
}: {
  entityId: string;
  entityType: PendingInvitationRequest["entityType"];
  pendingInvitations: PendingInvitationRequestDetail[];
}) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pendingInvitations}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <ThemedText style={{ textAlign: "center" }}>
            No hay invitaciones pendientes
          </ThemedText>
        )}
        renderItem={({ item }) => (
          <CardApp type="withShadow" style={styles.invitationItem}>
            <View style={styles.invitationInfo}>
              <IconApp
                name={
                  item.confirmed === undefined
                    ? "hourglass"
                    : item.confirmed
                      ? "checkbox"
                      : "close"
                }
                size={20}
              />
              <View style={styles.invitationText}>
                <ThemedText type="defaultSemiBold">
                  {item.invitedUser.userName}@{item.invitedUser.id}
                </ThemedText>
                <ThemedText type="defaultSemiBold">
                  {item.invitationDate.toLocaleString()}
                </ThemedText>
              </View>
            </View>
          </CardApp>
        )}
      />
    </>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
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
  });
