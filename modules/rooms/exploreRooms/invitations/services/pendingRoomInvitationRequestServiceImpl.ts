import { pendingRoomInvitationRequestMockResponse } from "./pendingRoomInvitationRequestResponse";
import { PendingRoomInvitationRequest } from "../models/PendingRoomInvitationRequest";
import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { roomMemberServiceInstance } from "@/services/roomMember/roomMemberServiceImpl";

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
    return successPromiseBehavior(async () => {
      const invitation = this.pendingRoomInvitationRequests.find(
        (inv) => inv.id === id
      );
      if (!invitation) {
        throw new Error("Invitation not found");
      }

      this.pendingRoomInvitationRequests =
        this.pendingRoomInvitationRequests.filter(
          (invitation) => invitation.id !== id
        );

      roomMemberServiceInstance.joinRoomInstant(
        invitation.roomCode,
        invitation.invitedUserId
      );
    }).then(() => ({ id }));
  }
}

export const pendingRoomInvitationRequestServiceInstance =
  new PendingRoomInvitationRequestServiceImpl();
