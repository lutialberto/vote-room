import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, View, RefreshControl, FlatList } from "react-native";
import RoomCardItem from "@/components/RoomCardItem";
import { Room } from "../../models/Room";
import RoomStats, { ROOM_STATS, RoomStatNames } from "@/components/RoomStats";
import { fetchRoomsByUser } from "@/services/roomMember/roomMemberService";
import { useUser } from "@/contexts/UserContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";

export default function MyRooms() {
  const { currentUser } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedStats, setSelectedStats] = useState<RoomStatNames | undefined>(
    undefined
  );
  const { primary: primaryColor } = useThemeColor();

  const roomsBySelectedStat = selectedStats
    ? rooms.filter((room) =>
        ROOM_STATS[selectedStats].criteria(room, currentUser)
      )
    : rooms;

  useEffect(() => {
    const fetchRooms2 = () => {
      fetchRoomsByUser(currentUser.id).then((res) => setRooms(res));
    };

    fetchRooms2();
  }, [currentUser.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchRoomsByUser(currentUser.id).then((res) => {
      setRooms(res);
      setRefreshing(false);
    });
  };

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
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={primaryColor}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <IconApp name="home-outline" size={80} />
            <ThemedText>No tienes salas aún</ThemedText>
            <ThemedText style={styles.emptyDescription}>
              Crea una nueva sala o únete a una existente para comenzar
            </ThemedText>
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
