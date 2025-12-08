import { pendingRoomInvitationRequestMockResponse } from "./pendingRoomInvitationRequestResponse";
import { PendingRoomInvitationRequest } from "../models/PendingRoomInvitationRequest";

export class PendingRoomInvitationRequestServiceImpl {
  private pendingRoomInvitationRequests: PendingRoomInvitationRequest[] = [
    ...pendingRoomInvitationRequestMockResponse,
  ];

  async fetchPendingRoomInvitationRequests(
    userId: number
  ): Promise<PendingRoomInvitationRequest[]> {
    return new Promise<PendingRoomInvitationRequest[]>((resolve) => {
      setTimeout(() => {
        resolve(
          this.pendingRoomInvitationRequests.filter(
            (invitation) =>
              invitation.invitedUserId === userId && !invitation.confirmed
          )
        );
      }, 500);
    });
  }

  async rejectPendingRoomInvitationRequest(id: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.pendingRoomInvitationRequests =
          this.pendingRoomInvitationRequests.filter(
            (invitation) => invitation.id !== id
          );
        resolve();
      }, 500);
    });
  }

  async acceptPendingRoomInvitationRequest(id: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.pendingRoomInvitationRequests =
          this.pendingRoomInvitationRequests.map((invitation) =>
            invitation.id === id
              ? { ...invitation, confirmed: true }
              : invitation
          );
        resolve();
      }, 500);
    });
  }
}

export const pendingRoomInvitationRequestServiceInstance =
  new PendingRoomInvitationRequestServiceImpl();
