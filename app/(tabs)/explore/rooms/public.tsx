import { ButtonApp } from "@/components/ButtonApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { PublicRoomType, PublicRoomTypeFilter } from "@/models/Room";
import PublicRoomCard from "@/modules/explore/public/public/components/PublicRoomCard";
import SearchBarApp from "@/components/SearchBarApp";
import PublicRoomFilterModal from "@/modules/explore/public/public/components/PublicRoomFilterModal";
import { fetchPublicRooms } from "@/services/room/roomService";
import { joinRoom } from "@/services/roomMember/roomMemberService";
import { useState } from "react";
import { FlatList, View } from "react-native";
import FilterChips, { FilterItem } from "@/components/FilterChips";
import { router } from "expo-router";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

const filterLabels: Record<keyof PublicRoomTypeFilter, string> = {
  label: "Nombre",
  code: "Código",
  ownerName: "Creador",
  tags: "tag",
};

export default function PublicRoomsTab() {
  const [appliedFilters, setAppliedFilters] = useState<
    FilterItem<PublicRoomTypeFilter>[]
  >([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { currentUser } = useAuthenticatedUser();
  const { data, error, isLoading, refetch } =
    useListFetcherApp<PublicRoomType>(() => {
      const formattedFilter: PublicRoomTypeFilter = appliedFilters.reduce(
        (acc, item) => ({
          ...acc,
          [item.key]: item.value,
        }),
        {} as PublicRoomTypeFilter
      );
      return fetchPublicRooms(currentUser.id, formattedFilter);
    }, [currentUser.id, appliedFilters]);
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
      router.push(`/dashboard/myRooms/${roomCode}`);
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
          <SearchBarApp
            onSearch={(value) =>
              setAppliedFilters((prev) => [
                ...prev,
                { key: "label", label: filterLabels.label, value },
              ])
            }
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
        <FilterChips
          filters={appliedFilters}
          onRemoveFilter={(key) =>
            setAppliedFilters((prev) => prev.filter((f) => f.key !== key))
          }
          onClearAll={() => setAppliedFilters([])}
        />
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={refetch}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
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
            const formattedFilter: FilterItem<PublicRoomTypeFilter>[] = (
              Object.keys(filter) as (keyof PublicRoomTypeFilter)[]
            ).map((key) => ({
              key,
              label: filterLabels[key],
              value: filter[key] as string | string[],
            }));
            setAppliedFilters(formattedFilter);
            setIsFilterModalVisible(false);
          }}
        />
      </ThemedView>
    </SpinnerApp>
  );
}
