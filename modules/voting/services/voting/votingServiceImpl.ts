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
