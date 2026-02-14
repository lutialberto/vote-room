import { pendingRoomInvitationRequestMockResponse } from "./pendingRoomInvitationRequestResponse";
import { PendingRoomInvitationRequest } from "../models/PendingRoomInvitationRequest";
import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { roomMemberServiceInstance } from "@/services/roomMember/roomMemberServiceImpl";
import { PendingInvitation } from "@/modules/rooms/inviteUsers/models/PendingInvitation";
import { userServiceInstance } from "@/services/user/userServiceImpl";
import { User } from "@/models/User";
import { roomServiceInstance } from "@/services/room/roomServiceImpl";

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

  async createPendingRoomInvitationsRequest(
    pendingInvitations: PendingInvitation[],
    roomCode: string
  ): Promise<boolean> {
    return successPromiseBehavior(async () => {
      const room = roomServiceInstance.getInstantRoomByCode(roomCode);
      if (!room) {
        throw new Error("Room not found: " + roomCode);
      }

      pendingInvitations.forEach((pendingInvitation) => {
        let invitedUserId: number;
        let user: User | undefined;
        switch (pendingInvitation.type) {
          case "userEmail":
            user = userServiceInstance.getInstantUserByEmail(
              pendingInvitation.value
            );
            if (!user) {
              throw new Error(
                "User with this email not found: " + pendingInvitation.value
              );
            }
            invitedUserId = user.id;
            break;
          case "userName":
            user = userServiceInstance.getInstantUserByUserName(
              pendingInvitation.value
            );
            if (!user) {
              throw new Error(
                "User with this name not found: " + pendingInvitation.value
              );
            }
            invitedUserId = user.id;
            break;
          case "userId":
            invitedUserId = parseInt(pendingInvitation.value, 10);
            user = userServiceInstance.getInstantUserById(invitedUserId);
            if (!user) {
              throw new Error(
                "User with this ID not found: " + pendingInvitation.value
              );
            }
            break;
          case "invitationListName":
          case "invitationListId":
          //TODO: Implementar lógica para listas de invitación
          default:
            throw new Error("Tipo de invitación no soportado");
        }

        const invitation = this.pendingRoomInvitationRequests.find(
          (inv) => inv.invitedUserId === user.id && inv.roomCode === roomCode
        );
        if (!invitation) {
          const newInvitationEmail: PendingRoomInvitationRequest = {
            invitationDate: new Date(),
            invitedUserId,
            confirmed: false,
            id:
              this.pendingRoomInvitationRequests
                .map((inv) => inv.id)
                .reduce((maxId, currentId) => Math.max(maxId, currentId), 0) +
              1,
            roomCode,
            roomDescription: room.description,
            roomName: room.description,
          };
          this.pendingRoomInvitationRequests.push(newInvitationEmail);
        }
      });
    }).then(() => true);
  }
}

export const pendingRoomInvitationRequestServiceInstance =
  new PendingRoomInvitationRequestServiceImpl();
