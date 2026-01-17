import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import {
  BaseVoting,
  BaseVotingForCreation,
  VotingReleaseType,
  VotingStatus,
} from "../../models/Voting";
import { userServiceInstance } from "@/services/user/userServiceImpl";
import { votingCoreService } from "./votingCoreService";
import { votingMemberServiceInstance } from "../votingMember/votingMemberServiceImpl";

export class VotingServiceImpl {
  createInstantBaseVoting(
    baseData: BaseVotingForCreation,
    userId: number
  ): BaseVoting {
    const user = userServiceInstance.getInstantUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const mapper: Record<VotingReleaseType, VotingStatus> = {
      releaseOnCreate: "active",
      releaseScheduled: "scheduled",
      manualRelease: "draft",
    };
    const status: VotingStatus = mapper[baseData.release.type];
    const votings = votingCoreService.getInstantBaseVotings();
    const newBaseVoting: BaseVoting = {
      ...baseData,
      owner: {
        id: userId,
        email: user.email,
        name: user.name,
        userName: user.userName,
      },
      status,
      id: Math.max(...votings.map((e) => e.id)) + 1,
    };

    votingCoreService.addInstantBaseVoting(newBaseVoting);
    return { ...newBaseVoting };
  }

  async updateBaseVoting(
    data: BaseVotingForCreation,
    id: number,
    userId: number
  ): Promise<BaseVoting> {
    return successPromiseBehavior(() => {
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const votingToUpdate = this.getInstantBaseVotingById(id);
      if (!votingToUpdate) {
        throw new Error("Voting not found");
      }
      const isOwner = votingToUpdate.owner.id === userId;
      if (!isOwner) {
        throw new Error("User is not the owner of the voting");
      }
      const mapper: Record<VotingReleaseType, VotingStatus> = {
        releaseOnCreate: "active",
        releaseScheduled: "scheduled",
        manualRelease: "draft",
      };
      const status: VotingStatus = mapper[data.release.type];
      const updatedVoting: BaseVoting = {
        ...votingToUpdate,
        ...data,
        status,
      };

      votingCoreService.updateInstantBaseVoting(updatedVoting);
      return { ...updatedVoting };
    });
  }

  async activateBaseVoting(id: number, userId: number): Promise<BaseVoting> {
    return successPromiseBehavior(() => {
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const votingToActivate = this.getInstantBaseVotingById(id);
      if (!votingToActivate) {
        throw new Error("Voting not found");
      }
      const isOwner = votingToActivate.owner.id === userId;
      if (!isOwner) {
        throw new Error("User is not the owner of the voting");
      }
      const isActivatable =
        votingToActivate.status === "draft" ||
        votingToActivate.release.type === "manualRelease";
      if (!isActivatable) {
        throw new Error("Voting cannot be activated");
      }
      const updatedVoting: BaseVoting = {
        ...votingToActivate,
        status: "active",
      };

      votingCoreService.updateInstantBaseVoting(updatedVoting);
      return { ...updatedVoting };
    });
  }

  async closeBaseVoting(id: number, userId: number): Promise<BaseVoting> {
    return successPromiseBehavior(() => {
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const votingToClose = this.getInstantBaseVotingById(id);
      if (!votingToClose) {
        throw new Error("Voting not found");
      }
      const isOwner = votingToClose.owner.id === userId;
      if (!isOwner) {
        throw new Error("User is not the owner of the voting");
      }
      const isClosable =
        votingToClose.status === "active" &&
        votingToClose.close.type === "manualClose";
      if (!isClosable) {
        throw new Error("Voting cannot be closed");
      }
      const updatedVoting: BaseVoting = {
        ...votingToClose,
        status: "closed",
      };

      votingCoreService.updateInstantBaseVoting(updatedVoting);
      return { ...updatedVoting };
    });
  }

  getInstantBaseVotingById(id: number): BaseVoting | undefined {
    return votingCoreService.getInstantBaseVotingById(id);
  }

  async fetchBaseVotingById(id: number): Promise<BaseVoting> {
    return successPromiseBehavior(() => {
      const voting = this.getInstantBaseVotingById(id);
      if (!voting) {
        throw new Error("Voting not found");
      }
      return { ...voting };
    });
  }

  async fetchBaseVotingsByUserId(userId: number): Promise<BaseVoting[]> {
    return successPromiseBehavior(() => {
      const votingsMember =
        votingMemberServiceInstance.getInstantVotingMembersByUserId(userId);
      const votings: BaseVoting[] = [];
      votingsMember?.forEach((votingMember) => {
        const voting = this.getInstantBaseVotingById(votingMember.votingId);
        if (voting) {
          votings.push(voting);
        }
      });
      return votings;
    });
  }
}

export const votingServiceInstance = new VotingServiceImpl();
