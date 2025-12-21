import { Owner } from "@/models/User";
import { VotingCloseType, VotingReleaseType } from "./Voting";

export default interface QuickBooleanPoll {
  id: number;
  question: string;
  description?: string;
  owner: Owner;
  close: {
    type: VotingCloseType;
    durationMinutes?: number;
  };
  release: {
    type: VotingReleaseType;
    date?: Date;
  };
}

export type QuickBooleanPollForCreation = Omit<
  QuickBooleanPoll,
  "id" | "owner"
>;
