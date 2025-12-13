import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/contexts/UserContext";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { PublicRoomType } from "@/models/Room";
import PublicRoomCard from "@/modules/rooms/exploreRooms/public/components/PublicRoomCard";
import { fetchPublicRooms } from "@/services/room/roomService";
import { joinRoom } from "@/services/roomMember/roomMemberService";
import { FlatList } from "react-native";

export default function PublicRoomsTab() {
  const { currentUser } = useUser();
  const { data, error, isLoading, refetch } = useListFetcherApp<PublicRoomType>(
    () => fetchPublicRooms(currentUser.id)
  );
  const { isWaiting, execPromise: handleJoinRoom } = useWaitingApp<{
    roomCode: string;
    userId: number;
  }>({
    functionToWait: ({ roomCode, userId }) => joinRoom(roomCode, userId),
    success: refetch,
  });

  return (
    <SpinnerApp visible={isWaiting}>
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
    </SpinnerApp>
  );
}
