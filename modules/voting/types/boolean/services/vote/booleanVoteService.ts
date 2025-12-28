import { BooleanVote } from "../../models/BooleanVote";
import { booleanVoteServiceInstance } from "./booleanVoteServiceImpl";

export function fetchBooleanVotesByVotingId(
  votingId: number
): Promise<BooleanVote[]> {
  return booleanVoteServiceInstance.fetchBooleanVotesByVotingId(votingId);
}

export function castBooleanVote({
  votingId,
  userId,
  choice,
}: {
  votingId: number;
  userId: number;
  choice: boolean;
}): Promise<BooleanVote> {
  return booleanVoteServiceInstance.castBooleanVote(votingId, userId, choice);
}
