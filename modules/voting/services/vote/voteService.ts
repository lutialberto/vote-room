import { Vote } from "../../models/Voting";
import { voteServiceInstance } from "./voteServiceImpl";

export function fetchVotesByVotingId(votingId: number): Promise<Vote[]> {
  return voteServiceInstance.fetchVotesByVotingId(votingId);
}

export function castVote({
  votingId,
  userId,
  choice,
}: {
  votingId: number;
  userId: number;
  choice: boolean;
}): Promise<Vote> {
  return voteServiceInstance.castVote(votingId, userId, choice);
}
