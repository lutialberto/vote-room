import { useEffect, useState } from "react";
import { fetchPendingInvitations } from "../services/pendingInvitationRequestService";
import { PendingInvitationRequest } from "../models/PendingInvitationRequest";

export function usePendingInvitationRequest(userId: number) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<PendingInvitationRequest[]>(
    []
  );

  useEffect(() => {
    fetchInvitations();
  }, [userId]);

  function fetchInvitations() {
    setIsLoading(true);
    setError(null);
    fetchPendingInvitations(userId)
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
