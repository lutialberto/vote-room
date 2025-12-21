import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import QuickBooleanPoll, {
  QuickBooleanPollForCreation,
} from "../new/models/QuickBooleanPoll";
import { QUICK_BOOLEAN_POLL_MOCK_RESPONSE } from "./votingServiceResponse";

export class VotingServiceImpl {
  private quickBooleanPolls: QuickBooleanPoll[] = [
    ...QUICK_BOOLEAN_POLL_MOCK_RESPONSE,
  ];

  async createQuickBooleanPoll(
    pollData: QuickBooleanPollForCreation,
    userId: number
  ): Promise<QuickBooleanPoll> {
    return successPromiseBehavior(() => {
      const newPoll: QuickBooleanPoll = {
        ...pollData,
        owner: {
          id: userId,
          username: `User ${userId}`,
        },
        id: Math.max(...this.quickBooleanPolls.map((e) => e.id)) + 1,
      };

      this.quickBooleanPolls.push(newPoll);
      return { ...newPoll };
    });
  }
}

export const votingServiceInstance = new VotingServiceImpl();
