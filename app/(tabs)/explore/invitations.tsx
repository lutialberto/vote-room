import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import PendingInvitationsList from "@/modules/explore/invitations/components/PendingInvitationsList";
import { usePendingInvitationRequest } from "@/modules/explore/invitations/hooks/usePendingInvitationRequest";
import {
  acceptPendingInvitationRequest,
  rejectPendingInvitationRequest,
} from "@/modules/explore/invitations/services/pendingInvitationRequestService";
import { router } from "expo-router";
import { Alert } from "react-native";

export default function InvitationsTab() {
  const { currentUser } = useAuthenticatedUser();
  const {
    data,
    error,
    isLoading: isLoadingData,
    refetch,
    removeDataItem,
  } = usePendingInvitationRequest(currentUser?.id);
  const { isWaiting: isWaitingAccept, execPromise: handleAccept } =
    useWaitingApp<
      {
        id: number;
      },
      {
        id: number;
      }
    >({
      functionToWait: ({ id }) => acceptPendingInvitationRequest(id),
      success: ({ id }) => {
        removeDataItem(id);
        const item = data.find((invitation) => invitation.id === id);
        router.push(`/dashboard/myRooms/${item?.entityId}`);
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
      functionToWait: ({ id }) => rejectPendingInvitationRequest(id),
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
    <PendingInvitationsList
      isWaiting={isWaitingAccept || isWaitingReject}
      isLoadingData={isLoadingData}
      error={error}
      onAccept={(id) => handleAccept({ id })}
      onReject={(id) => handleReject(id)}
      onRefetch={refetch}
      data={data}
    />
  );
}
