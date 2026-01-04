import { OptionsVote } from "../../models/OptionsVote";
import { optionsVoteServiceInstance } from "./optionsVoteServiceImpl";

export function castOptionsVote({
  votingId,
  optionId,
  userId,
}: {
  votingId: number;
  optionId: number;
  userId: number;
}): Promise<OptionsVote> {
  return optionsVoteServiceInstance.castOptionsVote(votingId, userId, optionId);
}

export function fetchOptionsVotesByVotingId(
  votingId: number
): Promise<OptionsVote[]> {
  return optionsVoteServiceInstance.fetchOptionsVotesByVotingId(votingId);
}
