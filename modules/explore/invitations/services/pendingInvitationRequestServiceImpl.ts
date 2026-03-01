import { pendingInvitationRequestMockResponse } from "./pendingInvitationRequestResponse";
import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { roomMemberServiceInstance } from "@/services/roomMember/roomMemberServiceImpl";
import { PendingInvitation } from "@/modules/explore/invitations/models/PendingInvitation";
import { userServiceInstance } from "@/services/user/userServiceImpl";
import { User } from "@/models/User";
import { roomServiceInstance } from "@/services/room/roomServiceImpl";
import { PendingInvitationRequest } from "../models/PendingInvitationRequest";
import { votingMemberServiceInstance } from "@/modules/voting/services/votingMember/votingMemberServiceImpl";
import { votingServiceInstance } from "@/modules/voting/services/voting/votingServiceImpl";
import { awardMemberServiceInstance } from "@/modules/awards/services/awardMember/awardMemberServiceImpl";
import { awardServiceInstance } from "@/modules/awards/services/award/awardServiceImpl";

export class PendingInvitationRequestServiceImpl {
  private pendingInvitationRequests: PendingInvitationRequest[] = [
    ...pendingInvitationRequestMockResponse,
  ];

  async fetchPendingInvitationRequests(
    userId: number
  ): Promise<PendingInvitationRequest[]> {
    return successPromiseBehavior(() =>
      this.pendingInvitationRequests.filter(
        (invitation) =>
          invitation.invitedUserId === userId && !invitation.confirmed
      )
    );
  }

  async rejectPendingInvitationRequest(id: number): Promise<{ id: number }> {
    return successPromiseBehavior(() => {
      this.pendingInvitationRequests = this.pendingInvitationRequests.filter(
        (invitation) => invitation.id !== id
      );
    }).then(() => ({ id }));
  }

  async acceptPendingInvitationRequest(
    id: number
  ): Promise<PendingInvitationRequest> {
    return successPromiseBehavior(async () => {
      const invitation = this.pendingInvitationRequests.find(
        (inv) => inv.id === id
      );
      if (!invitation) {
        throw new Error("Invitation not found");
      }

      this.pendingInvitationRequests = this.pendingInvitationRequests.filter(
        (invitation) => invitation.id !== id
      );

      switch (invitation.entityType) {
        case "room":
          roomMemberServiceInstance.joinRoomInstant(
            invitation.entityId,
            invitation.invitedUserId
          );
          break;
        case "voting":
          votingMemberServiceInstance.addInstantVotingMember(
            Number(invitation.entityId),
            invitation.invitedUserId
          );
          break;
        case "award":
          awardMemberServiceInstance.addInstantAwardMember(
            Number(invitation.entityId),
            invitation.invitedUserId
          );
          break;
        default:
          throw new Error("Tipo de entidad no soportado en invitación");
      }
      return { ...invitation };
    });
  }

  async createPendingInvitationsRequest(
    pendingInvitations: PendingInvitation[],
    entityId: string,
    type: PendingInvitationRequest["entityType"]
  ): Promise<boolean> {
    return successPromiseBehavior(async () => {
      let entityData: { description: string; name: string };
      switch (type) {
        case "room":
          const room = roomServiceInstance.getInstantRoomByCode(entityId);
          if (!room) {
            throw new Error("Room not found: " + entityId);
          }
          entityData = {
            description: room.description,
            name: room.label,
          };
          break;
        case "voting":
          const voting = votingServiceInstance.getInstantBaseVotingById(
            Number(entityId)
          );
          if (!voting) {
            throw new Error("Voting not found: " + entityId);
          }
          entityData = {
            description: voting.description || "",
            name: voting.question,
          };
          break;
        case "award":
          const award = awardServiceInstance.getInstantAwardById(
            Number(entityId)
          );
          if (!award) {
            throw new Error("Award not found: " + entityId);
          }
          entityData = {
            name: award.name,
            description: award.description,
          };
          break;
        default:
          throw new Error("Tipo de entidad no soportado en invitación");
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

        const invitation = this.pendingInvitationRequests.find(
          (inv) => inv.invitedUserId === user.id && inv.entityId === entityId
        );
        if (!invitation) {
          const newInvitationEmail: PendingInvitationRequest = {
            invitationDate: new Date(),
            invitedUserId,
            confirmed: false,
            id:
              this.pendingInvitationRequests
                .map((inv) => inv.id)
                .reduce((maxId, currentId) => Math.max(maxId, currentId), 0) +
              1,
            entityId,
            description: entityData.description,
            name: entityData.name,
            entityType: type,
          };
          this.pendingInvitationRequests.push(newInvitationEmail);
        }
      });
    }).then(() => true);
  }
}

export const pendingInvitationRequestServiceInstance =
  new PendingInvitationRequestServiceImpl();
