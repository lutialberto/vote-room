import { PendingInvitation } from "@/modules/explore/invitations/models/PendingInvitation";
import { pendingInvitationRequestServiceInstance } from "./pendingInvitationRequestServiceImpl";
import {
  PendingInvitationRequest,
  PendingInvitationRequestDetail,
} from "../models/PendingInvitationRequest";

export function fetchPendingInvitations(
  userId: number
): Promise<PendingInvitationRequest[]> {
  return pendingInvitationRequestServiceInstance.fetchPendingInvitationRequests(
    userId
  );
}

export function fetchPendingInvitationRequestDetailsByEntityId(
  entityId: string
): Promise<PendingInvitationRequestDetail[]> {
  return pendingInvitationRequestServiceInstance.fetchPendingInvitationRequestDetailsByEntityId(
    entityId
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

export function createPendingInvitationRequest(
  pendingInvitation: PendingInvitation,
  entityId: string,
  type: PendingInvitationRequest["entityType"]
): Promise<boolean> {
  return pendingInvitationRequestServiceInstance.createPendingInvitationRequest(
    pendingInvitation,
    entityId,
    type
  );
}
