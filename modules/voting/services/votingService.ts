import QuickBooleanPoll, {
  QuickBooleanPollForCreation,
} from "../new/models/QuickBooleanPoll";
import { votingServiceInstance } from "./votingServiceImpl";

export const createQuickBooleanPoll = ({
  pollData,
  userId,
}: {
  pollData: QuickBooleanPollForCreation;
  userId: number;
}): Promise<QuickBooleanPoll> =>
  votingServiceInstance.createQuickBooleanPoll(pollData, userId);
