import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/contexts/UserContext";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { PendingRoomInvitationRequestCard } from "@/modules/rooms/exploreRooms/invitations/components/PendingRoomInvitationRequestCard";
import { usePendingRoomInvitationRequest } from "@/modules/rooms/exploreRooms/invitations/hooks/usePendingRoomInvitationRequest";
import {
  acceptPendingRoomInvitationRequest,
  rejectPendingRoomInvitationRequest,
} from "@/modules/rooms/exploreRooms/invitations/services/pendingRoomInvitationRequestService";
import { router } from "expo-router";
import { Alert, FlatList, StyleSheet } from "react-native";

export default function InvitationsTab() {
  const { currentUser } = useUser();
  const {
    data,
    error,
    isLoading: isLoadingData,
    refetch,
    removeDataItem,
  } = usePendingRoomInvitationRequest(currentUser?.id);
  const { isWaiting: isWaitingAccept, execPromise: handleAccept } =
    useWaitingApp<
      {
        id: number;
      },
      {
        id: number;
      }
    >({
      functionToWait: ({ id }) => acceptPendingRoomInvitationRequest(id),
      success: ({ id }) => {
        removeDataItem(id);
        const item = data.find((invitation) => invitation.id === id);
        router.push(`/${item?.roomCode}/shareRoom`);
      },
    });
  const { isWaiting: isWaitingReject, execPromise: handleRejectConfirmed } =
    useWaitingApp<
      {
        id: number;
      },
      {
        id: number;
      }
    >({
      functionToWait: ({ id }) => rejectPendingRoomInvitationRequest(id),
      success: ({ id }) => {
        removeDataItem(id);
      },
    });

  function handleReject(id: number) {
    if (isWaitingReject) return;

    Alert.alert(
      "Rechazar Invitación",
      "¿Estás seguro de que deseas rechazar esta invitación?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Rechazar",
          onPress: () => handleRejectConfirmed({ id }),
          style: "destructive",
        },
      ]
    );
  }

  return (
    <ThemedView style={styles.tabContainer}>
      <SpinnerApp visible={isWaitingAccept || isWaitingReject}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          refreshing={isLoadingData}
          onRefresh={refetch}
          data={data}
          style={{ width: "100%" }}
          ListEmptyComponent={() => (
            <ThemedText style={styles.emptyText}>
              {error
                ? "Ocurrió un error intentando cargar las invitaciones"
                : "No tienes invitaciones pendientes.\n¡Cuando te inviten a una sala aparecerán aquí!"}{" "}
            </ThemedText>
          )}
          renderItem={({ item }) => (
            <PendingRoomInvitationRequestCard
              invitationDate={item.invitationDate}
              onAccept={() => handleAccept({ id: item.id })}
              onReject={() => handleReject(item.id)}
              roomDescription={item.roomDescription}
              roomName={item.roomName}
            />
          )}
        />
      </SpinnerApp>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 24,
  },
});
