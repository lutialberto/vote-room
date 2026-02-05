import { ButtonApp } from "@/components/ButtonApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { PublicRoomType, PublicRoomTypeFilter } from "@/models/Room";
import PublicRoomCard from "@/modules/rooms/exploreRooms/public/components/PublicRoomCard";
import PublicRoomSearchBar from "@/modules/rooms/exploreRooms/public/components/PublicRoomSearchBar";
import PublicRoomFilterModal from "@/modules/rooms/exploreRooms/public/components/PublicRoomFilterModal";
import { fetchPublicRooms } from "@/services/room/roomService";
import { joinRoom } from "@/services/roomMember/roomMemberService";
import { useState } from "react";
import { FlatList, View } from "react-native";
import PublicRoomFilterChips from "@/modules/rooms/exploreRooms/public/components/PublicRoomFilterChips";
import { router } from "expo-router";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function PublicRoomsTab() {
  const [filter, setFilter] = useState<PublicRoomTypeFilter>({});
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { currentUser } = useAuthenticatedUser();
  const { data, error, isLoading, refetch } = useListFetcherApp<PublicRoomType>(
    () => fetchPublicRooms(currentUser.id, filter),
    [currentUser.id, filter]
  );
  const { isWaiting, execPromise: handleJoinRoom } = useWaitingApp<
    {
      roomCode: string;
      userId: number;
    },
    {
      roomCode: string;
    }
  >({
    functionToWait: ({ roomCode, userId }) => joinRoom(roomCode, userId),
    success: ({ roomCode }) => {
      refetch();
      router.push(`/(tabs)/myRooms/${roomCode}/shareRoom`);
    },
  });

  return (
    <SpinnerApp visible={isWaiting}>
      <ThemedView style={{ flex: 1, paddingVertical: 4, paddingHorizontal: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginHorizontal: 4,
          }}
        >
          <PublicRoomSearchBar
            onSearch={(label) => setFilter((prev) => ({ ...prev, label }))}
          />
          <ButtonApp
            icon="filter"
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              borderRadius: 0,
            }}
            onPress={() => setIsFilterModalVisible(true)}
          />
        </View>
        <PublicRoomFilterChips
          filter={filter}
          onRemoveFilter={(key) =>
            setFilter((prev) => {
              const updatedFilter = { ...prev };
              delete updatedFilter[key];
              return updatedFilter;
            })
          }
          onClearAll={() => setFilter({})}
        />
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={refetch}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <PublicRoomCard
              roomName={item.label}
              roomDescription={item.description}
              participantCount={item.memberCount || 0}
              lastActivity={item.lastActivity || "Actividad desconocida"}
              tags={item.tags || []}
              ownerName={item.ownerName}
              onJoin={() =>
                handleJoinRoom({ roomCode: item.code, userId: currentUser.id })
              }
            />
          )}
          ListEmptyComponent={() => (
            <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
              {error
                ? "Ocurrió un error al cargar las salas públicas."
                : "No hay salas públicas disponibles en este momento."}
            </ThemedText>
          )}
        />

        <PublicRoomFilterModal
          visible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          onApply={(filter) => {
            setFilter(filter);
            setIsFilterModalVisible(false);
          }}
        />
      </ThemedView>
    </SpinnerApp>
  );
}
