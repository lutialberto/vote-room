import { CardApp } from "@/components/CardApp";
import { IconApp, IconName } from "@/components/IconApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ColorScheme } from "@/constants/Colors";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Room } from "@/models/Room";
import { RoomMemberWithUser } from "@/models/RoomMember";
import { User, UserEmail } from "@/models/User";
import { fetchRoomByCode } from "@/services/room/roomService";
import { fetchRoomMembersByRoom } from "@/services/roomMember/roomMemberService";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function RoomMembersScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const colors = useThemeColor();
  const { currentUser } = useAuthenticatedUser();
  const styles = getStyles(colors);

  const { data, error, isLoading, refetch } =
    useListFetcherApp<RoomMemberWithUser>(
      () => fetchRoomMembersByRoom(roomId),
      [roomId]
    );

  const { data: roomData } = useItemFetcherApp<Room | null>(
    () => fetchRoomByCode(roomId),
    [roomId]
  );

  const isOwner = roomData?.ownerUserId === currentUser.id;

  const handleRemoveMember = (member: RoomMemberWithUser) => {
    Alert.alert(
      "Eliminar miembro",
      `¿Estás seguro de que quieres eliminar a ${member.user.userName} de la sala?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            //TODO: Implementar eliminación de miembro
            Alert.alert(
              "Funcionalidad no implementada",
              "Esta función estará disponible pronto."
            );
          },
        },
      ]
    );
  };

  const renderMemberItem = ({ item }: { item: RoomMemberWithUser }) => {
    const isCurrentUser = item.user.id === currentUser.id;
    const isRoomOwner = item.user.id === roomData?.ownerUserId;

    const getUserTypeInfo = (): {
      icon: IconName;
      badgeText: string;
      badgeColor: string;
    } => {
      switch (item.user.type) {
        case "email":
          return {
            icon: "mail",
            badgeText: "Email",
            badgeColor: colors.primary,
          };
        case "kyc":
          return {
            icon: "shield-checkmark",
            badgeText: "Verificado",
            badgeColor: colors.green,
          };
        case "name":
        default:
          return {
            icon: "person-circle",
            badgeText: "Invitado",
            badgeColor: colors.secondary,
          };
      }
    };

    const userTypeInfo = getUserTypeInfo();

    return (
      <CardApp type="withShadow" style={styles.memberCard}>
        <View style={styles.memberInfo}>
          <View style={styles.avatarContainer}>
            <IconApp
              name={isRoomOwner ? "people" : userTypeInfo.icon}
              size={24}
              colorName={isRoomOwner ? "primary" : "text"}
            />
          </View>
          <View style={styles.memberDetails}>
            <ThemedText type="subtitle">
              {item.user.userName}@{item.user.id}
            </ThemedText>
            <View style={styles.nameContainer}>
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: userTypeInfo.badgeColor },
                ]}
              >
                <ThemedText type="hint" style={styles.typeBadgeText}>
                  {userTypeInfo.badgeText}
                </ThemedText>
              </View>

              {isRoomOwner && (
                <View style={styles.ownerBadge}>
                  <ThemedText type="hint" style={styles.ownerText}>
                    Propietario
                  </ThemedText>
                </View>
              )}
              {isCurrentUser && (
                <View style={styles.currentUserBadge}>
                  <ThemedText type="hint" style={styles.currentUserText}>
                    Tú
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>

        {isOwner && !isCurrentUser && !isRoomOwner && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveMember(item)}
          >
            <IconApp name="trash" size={20} colorName="cancel" />
          </TouchableOpacity>
        )}
      </CardApp>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMemberItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <IconApp name="people-outline" size={48} />
            <ThemedText type="subtitle" style={styles.emptyTitle}>
              {error
                ? "Error al cargar miembros"
                : "No hay miembros en esta sala"}
            </ThemedText>
            {error && (
              <ThemedText type="hint" style={styles.emptySubtitle}>
                Intenta de nuevo más tarde
              </ThemedText>
            )}
          </View>
        )}
      />
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 20,
    },
    listContent: {
      paddingBottom: 20,
    },
    memberCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    memberInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: 15,
    },
    avatarContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
    },
    memberDetails: {
      flex: 1,
      gap: 2,
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap",
    },
    typeBadge: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
    },
    typeBadgeText: {
      color: "white",
      fontSize: 9,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    ownerBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
    },
    ownerText: {
      color: "white",
      fontSize: 10,
      fontWeight: "600",
    },
    currentUserBadge: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
    },
    currentUserText: {
      color: "white",
      fontSize: 10,
      fontWeight: "600",
    },
    userInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 2,
    },
    userInfo: {
      fontSize: 12,
      flex: 1,
    },
    removeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.cancel + "10",
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
      gap: 12,
    },
    emptyTitle: {
      textAlign: "center",
    },
    emptySubtitle: {
      textAlign: "center",
      fontSize: 14,
    },
  });
