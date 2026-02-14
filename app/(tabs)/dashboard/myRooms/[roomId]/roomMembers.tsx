import { CardApp } from "@/components/CardApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ColorScheme } from "@/constants/Colors";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RoomMemberWithUser } from "@/models/RoomMember";
import { fetchRoomMembersByRoom } from "@/services/roomMember/roomMemberService";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

export default function RoomMembersScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const colors = useThemeColor();
  const styles = getStyles(colors);
  const { data, error, isLoading, refetch } =
    useListFetcherApp<RoomMemberWithUser>(
      () => fetchRoomMembersByRoom(roomId),
      [roomId]
    );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          //TODO: Mejorar diseño de cada miembro
          //TODO: Agregar más info del usuario (avatar, email, etc)
          //TODO: Agregar botón para eliminar miembro (solo para el dueño de la sala)
          <CardApp type="withShadow">
            <ThemedText>
              {item.user.userName}@{item.user.id}
            </ThemedText>
          </CardApp>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <ThemedText type="subtitle">
              {error
                ? "Ocurrió un error al cargar tus salas. Intenta de nuevo más tarde."
                : "No hay miembros en esta sala"}
            </ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      flex: 1,
      justifyContent: "center",
      gap: 20,
    },
    emptyContainer: {
      alignItems: "center",
    },
  });
