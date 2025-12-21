import { pendingRoomInvitationRequestMockResponse } from "./pendingRoomInvitationRequestResponse";
import { PendingRoomInvitationRequest } from "../models/PendingRoomInvitationRequest";
import { successPromiseBehavior } from "@/services/serviceUtilsImpl";

export class PendingRoomInvitationRequestServiceImpl {
  private pendingRoomInvitationRequests: PendingRoomInvitationRequest[] = [
    ...pendingRoomInvitationRequestMockResponse,
  ];

  async fetchPendingRoomInvitationRequests(
    userId: number
  ): Promise<PendingRoomInvitationRequest[]> {
    return successPromiseBehavior(() =>
      this.pendingRoomInvitationRequests.filter(
        (invitation) =>
          invitation.invitedUserId === userId && !invitation.confirmed
      )
    );
  }

  async rejectPendingRoomInvitationRequest(
    id: number
  ): Promise<{ id: number }> {
    return successPromiseBehavior(() => {
      this.pendingRoomInvitationRequests =
        this.pendingRoomInvitationRequests.filter(
          (invitation) => invitation.id !== id
        );
    }).then(() => ({ id }));
  }

  async acceptPendingRoomInvitationRequest(
    id: number
  ): Promise<{ id: number }> {
    return successPromiseBehavior(() => {
      this.pendingRoomInvitationRequests =
        this.pendingRoomInvitationRequests.map((invitation) =>
          invitation.id === id ? { ...invitation, confirmed: true } : invitation
        );
      this.pendingRoomInvitationRequests =
        this.pendingRoomInvitationRequests.map((invitation) =>
          invitation.id === id ? { ...invitation, confirmed: true } : invitation
        );
    }).then(() => ({ id }));
  }
}

export const pendingRoomInvitationRequestServiceInstance =
  new PendingRoomInvitationRequestServiceImpl();
