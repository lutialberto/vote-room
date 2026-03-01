import { PendingInvitation } from "@/modules/explore/invitations/models/PendingInvitation";
import { pendingInvitationRequestServiceInstance } from "./pendingInvitationRequestServiceImpl";
import { PendingInvitationRequest } from "../models/PendingInvitationRequest";

export function fetchPendingInvitations(
  userId: number
): Promise<PendingInvitationRequest[]> {
  return pendingInvitationRequestServiceInstance.fetchPendingInvitationRequests(
    userId
  );
}

export function rejectPendingInvitationRequest(
  id: number
): Promise<{ id: number }> {
  return pendingInvitationRequestServiceInstance.rejectPendingInvitationRequest(
    id
  );
}

export function acceptPendingInvitationRequest(
  id: number
): Promise<PendingInvitationRequest> {
  return pendingInvitationRequestServiceInstance.acceptPendingInvitationRequest(
    id
  );
}

export function createPendingInvitationsRequest(
  pendingInvitations: PendingInvitation[],
  entityId: string,
  type: PendingInvitationRequest["entityType"]
): Promise<boolean> {
  return pendingInvitationRequestServiceInstance.createPendingInvitationsRequest(
    pendingInvitations,
    entityId,
    type
  );
}
