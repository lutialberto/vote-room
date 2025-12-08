import { PendingRoomInvitationRequest } from "../models/PendingRoomInvitationRequest";
import { pendingRoomInvitationRequestServiceInstance } from "./pendingRoomInvitationRequestServiceImpl";

export function fetchPendingRoomInvitations(
  userId: number
): Promise<PendingRoomInvitationRequest[]> {
  return pendingRoomInvitationRequestServiceInstance.fetchPendingRoomInvitationRequests(
    userId
  );
}

export function rejectPendingRoomInvitationRequest(id: number): Promise<void> {
  return pendingRoomInvitationRequestServiceInstance.rejectPendingRoomInvitationRequest(
    id
  );
}

export function acceptPendingRoomInvitationRequest(id: number): Promise<void> {
  return pendingRoomInvitationRequestServiceInstance.acceptPendingRoomInvitationRequest(
    id
  );
}
