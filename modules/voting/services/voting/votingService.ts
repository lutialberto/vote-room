import QuickBooleanPoll, {
  QuickBooleanPollForCreation,
} from "../../new/models/QuickBooleanPoll";
import { votingServiceInstance } from "./votingServiceImpl";

export const createQuickBooleanPoll = ({
  pollData,
  userId,
}: {
  pollData: QuickBooleanPollForCreation;
  userId: number;
}): Promise<QuickBooleanPoll> =>
  votingServiceInstance.createQuickBooleanPoll(pollData, userId);

export const updateQuickBooleanPoll = ({
  pollData,
  id,
  userId,
}: {
  pollData: QuickBooleanPollForCreation;
  id: number;
  userId: number;
}): Promise<QuickBooleanPoll> =>
  votingServiceInstance.updateQuickBooleanPoll(pollData, id, userId);

export const activateQuickBooleanPoll = ({
  id,
  userId,
}: {
  id: number;
  userId: number;
}): Promise<QuickBooleanPoll> =>
  votingServiceInstance.activateQuickBooleanPoll(id, userId);

export const closeQuickBooleanPoll = ({
  id,
  userId,
}: {
  id: number;
  userId: number;
}): Promise<QuickBooleanPoll> =>
  votingServiceInstance.closeQuickBooleanPoll(id, userId);

export const fetchQuickBooleanPollById = (
  id: number
): Promise<QuickBooleanPoll> =>
  votingServiceInstance.fetchQuickBooleanPollById(id);
