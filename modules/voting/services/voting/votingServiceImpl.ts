import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import QuickBooleanPoll, {
  QuickBooleanPollForCreation,
} from "../../new/models/QuickBooleanPoll";
import { QUICK_BOOLEAN_POLL_MOCK_RESPONSE } from "./votingServiceResponse";
import { VotingReleaseType, VotingStatus } from "../../models/Voting";
import { userServiceInstance } from "@/services/user/userServiceImpl";

export class VotingServiceImpl {
  private quickBooleanPolls: QuickBooleanPoll[] = [
    ...QUICK_BOOLEAN_POLL_MOCK_RESPONSE,
  ];

  async createQuickBooleanPoll(
    pollData: QuickBooleanPollForCreation,
    userId: number
  ): Promise<QuickBooleanPoll> {
    return successPromiseBehavior(() => {
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const mapper: Record<VotingReleaseType, VotingStatus> = {
        releaseOnCreate: "active",
        releaseScheduled: "scheduled",
        manualRelease: "draft",
      };
      const status: VotingStatus = mapper[pollData.release.type];
      const newPoll: QuickBooleanPoll = {
        ...pollData,
        owner: {
          id: userId,
          userName: `User ${userId}`,
        },
        status,
        id: Math.max(...this.quickBooleanPolls.map((e) => e.id)) + 1,
      };

      this.quickBooleanPolls.push(newPoll);
      return { ...newPoll };
    });
  }

  async updateQuickBooleanPoll(
    pollData: QuickBooleanPollForCreation,
    id: number,
    userId: number
  ): Promise<QuickBooleanPoll> {
    return successPromiseBehavior(() => {
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const pollToUpdate = this.getInstantQuickBooleanPollById(id);
      if (!pollToUpdate) {
        throw new Error("Poll not found");
      }
      const isOwner = pollToUpdate.owner.id === userId;
      if (!isOwner) {
        throw new Error("User is not the owner of the poll");
      }
      const mapper: Record<VotingReleaseType, VotingStatus> = {
        releaseOnCreate: "active",
        releaseScheduled: "scheduled",
        manualRelease: "draft",
      };
      const status: VotingStatus = mapper[pollData.release.type];
      const updatedPoll: QuickBooleanPoll = {
        ...pollToUpdate,
        ...pollData,
        status,
      };

      this.quickBooleanPolls = this.quickBooleanPolls.map((poll) =>
        poll.id === updatedPoll.id ? updatedPoll : poll
      );
      return { ...updatedPoll };
    });
  }

  async activateQuickBooleanPoll(
    id: number,
    userId: number
  ): Promise<QuickBooleanPoll> {
    return successPromiseBehavior(() => {
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const pollToActivate = this.getInstantQuickBooleanPollById(id);
      if (!pollToActivate) {
        throw new Error("Poll not found");
      }
      const isOwner = pollToActivate.owner.id === userId;
      if (!isOwner) {
        throw new Error("User is not the owner of the poll");
      }
      const isActivatable =
        pollToActivate.status === "draft" ||
        pollToActivate.release.type === "manualRelease";
      if (!isActivatable) {
        throw new Error("Poll cannot be activated");
      }
      const updatedPoll: QuickBooleanPoll = {
        ...pollToActivate,
        status: "active",
      };

      this.quickBooleanPolls = this.quickBooleanPolls.map((poll) =>
        poll.id === updatedPoll.id ? updatedPoll : poll
      );
      return { ...updatedPoll };
    });
  }

  async closeQuickBooleanPoll(
    id: number,
    userId: number
  ): Promise<QuickBooleanPoll> {
    return successPromiseBehavior(() => {
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const pollToClose = this.getInstantQuickBooleanPollById(id);
      if (!pollToClose) {
        throw new Error("Poll not found");
      }
      const isOwner = pollToClose.owner.id === userId;
      if (!isOwner) {
        throw new Error("User is not the owner of the poll");
      }
      const isClosable =
        pollToClose.status === "active" &&
        pollToClose.close.type === "manualClose";
      if (!isClosable) {
        throw new Error("Poll cannot be closed");
      }
      const updatedPoll: QuickBooleanPoll = {
        ...pollToClose,
        status: "closed",
      };

      this.quickBooleanPolls = this.quickBooleanPolls.map((poll) =>
        poll.id === updatedPoll.id ? updatedPoll : poll
      );
      return { ...updatedPoll };
    });
  }

  getInstantQuickBooleanPollById(id: number): QuickBooleanPoll | undefined {
    return this.quickBooleanPolls.find((poll) => poll.id === id);
  }

  async fetchQuickBooleanPollById(id: number): Promise<QuickBooleanPoll> {
    return successPromiseBehavior(() => {
      const poll = this.getInstantQuickBooleanPollById(id);
      if (!poll) {
        throw new Error("Poll not found");
      }
      return { ...poll };
    });
  }
}

export const votingServiceInstance = new VotingServiceImpl();
