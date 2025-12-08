import { useEffect, useState } from "react";
import { PendingRoomInvitationRequest } from "../models/PendingRoomInvitationRequest";
import { fetchPendingRoomInvitations } from "../services/pendingRoomInvitationRequestService";

export function usePendingRoomInvitationRequest(userId: number) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<
    PendingRoomInvitationRequest[]
  >([]);

  useEffect(() => {
    fetchInvitations();
  }, [userId]);

  function fetchInvitations() {
    setIsLoading(true);
    setError(null);
    fetchPendingRoomInvitations(userId)
      .then((data) => {
        setInvitations(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }

  function removeDataItem(id: number) {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((invitation) => invitation.id !== id)
    );
  }

  return {
    data: invitations,
    error,
    isLoading,
    refetch: () => fetchInvitations(),
    removeDataItem,
  };
}
