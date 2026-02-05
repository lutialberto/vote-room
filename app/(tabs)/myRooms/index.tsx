import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet, View, RefreshControl, FlatList } from "react-native";
import RoomCardItem from "@/components/RoomCardItem";
import RoomStats, { ROOM_STATS, RoomStatNames } from "@/components/RoomStats";
import { fetchRoomsByUser } from "@/services/roomMember/roomMemberService";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function MyRooms() {
  const { currentUser } = useAuthenticatedUser();
  const {
    data: rooms,
    error,
    isLoading,
    refetch,
  } = useListFetcherApp(
    () => fetchRoomsByUser(currentUser.id),
    [currentUser.id]
  );
  const [selectedStats, setSelectedStats] = useState<RoomStatNames | undefined>(
    undefined
  );
  const { primary: primaryColor } = useThemeColor();

  const roomsBySelectedStat = selectedStats
    ? rooms.filter((room) =>
        ROOM_STATS[selectedStats].criteria(room, currentUser)
      )
    : rooms;

  return (
    <ThemedView>
      <View style={styles.header}>
        <ThemedText type="title">🏠 Mis Salas</ThemedText>
        <ThemedText type="subtitle" style={styles.pageSubtitle}>
          Salas donde eres miembro o propietario
        </ThemedText>
      </View>

      <FlatList
        data={roomsBySelectedStat}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => <RoomCardItem room={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={
          <RoomStats
            rooms={rooms}
            selectedStats={selectedStats}
            handleSelectedStatsItemPress={(item) =>
              setSelectedStats((prev) => (prev === item ? undefined : item))
            }
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={primaryColor}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {error ? (
              <ThemedText>
                Ocurrió un error al cargar tus salas. Intenta de nuevo más
                tarde.
              </ThemedText>
            ) : (
              <>
                <IconApp name="home-outline" size={80} />
                <ThemedText>No tienes salas aún</ThemedText>
                <ThemedText style={styles.emptyDescription}>
                  Crea una nueva sala o únete a una existente para comenzar
                </ThemedText>
              </>
            )}
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  pageSubtitle: {
    opacity: 0.7,
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyDescription: {
    opacity: 0.7,
    textAlign: "center",
  },
});
