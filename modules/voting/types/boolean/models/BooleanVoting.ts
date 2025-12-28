import { BaseVoting } from "../../../models/Voting";

export default interface BooleanVoting {
  id: number;
  baseVotingId: number;
  baseVoting: BaseVoting;
  type: "boolean";
}

export type BooleanVotingRecord = Omit<BooleanVoting, "type" | "baseVoting">;
