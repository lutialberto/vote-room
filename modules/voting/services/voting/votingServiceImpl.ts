import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { BASE_VOTING_MOCK_RESPONSE } from "./votingServiceResponse";
import {
  BaseVoting,
  BaseVotingForCreation,
  VotingReleaseType,
  VotingStatus,
} from "../../models/Voting";
import { userServiceInstance } from "@/services/user/userServiceImpl";

export class VotingServiceImpl {
  private votings: BaseVoting[] = [...BASE_VOTING_MOCK_RESPONSE];

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
    const newBaseVoting: BaseVoting = {
      ...baseData,
      owner: {
        id: userId,
        email: user.email,
        name: user.name,
        userName: user.userName,
      },
      status,
      id: Math.max(...this.votings.map((e) => e.id)) + 1,
    };

    this.votings.push(newBaseVoting);
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

      this.votings = this.votings.map((voting) =>
        voting.id === updatedVoting.id ? updatedVoting : voting
      );
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

      this.votings = this.votings.map((voting) =>
        voting.id === updatedVoting.id ? updatedVoting : voting
      );
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

      this.votings = this.votings.map((voting) =>
        voting.id === updatedVoting.id ? updatedVoting : voting
      );
      return { ...updatedVoting };
    });
  }

  getInstantBaseVotingById(id: number): BaseVoting | undefined {
    return this.votings.find((voting) => voting.id === id);
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
}

export const votingServiceInstance = new VotingServiceImpl();
