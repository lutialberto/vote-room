import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { votingServiceInstance } from "../../../../services/voting/votingServiceImpl";
import { OptionsVote } from "../../models/OptionsVote";
import { OPTIONS_VOTE_MOCK_RESPONSE } from "./optionsVoteServiceResponse";
import { optionsVotingChoiceServiceInstance } from "../choice/optionsVotingChoiceServiceImpl";

export class OptionsVoteServiceImpl {
  private optionsVotes: OptionsVote[] = [...OPTIONS_VOTE_MOCK_RESPONSE];

  async fetchOptionsVotesByVotingId(votingId: number): Promise<OptionsVote[]> {
    return successPromiseBehavior(() => [
      ...this.optionsVotes.filter((vote) => vote.votingId === votingId),
    ]);
  }

  async castOptionsVote(
    votingId: number,
    userId: number,
    votingOptionChoiceId: number
  ): Promise<OptionsVote> {
    return successPromiseBehavior(() => {
      const vote = votingServiceInstance.getInstantBaseVotingById(votingId);
      if (!vote) {
        throw new Error(`Voting not found with id: ${votingId}`);
      }

      if (vote.status !== "active") {
        throw new Error(
          `Voting is not active. Status: '${vote.status}', votingId: ${votingId}`
        );
      }
      const existingVote = this.optionsVotes.find(
        (vote) => vote.votingId === votingId && vote.userId === userId
      );
      if (existingVote) {
        throw new Error(
          `User ${userId} has already voted in voting ${votingId}. VoteId: ${existingVote.id}`
        );
      }
      const optionsVoting =
        optionsVotingChoiceServiceInstance.getInstantOptionsVotingChoicesByOptionsVotingId(
          votingId
        );
      if (!optionsVoting) {
        throw new Error(`Options voting not found with id: ${votingId}`);
      }
      const isValidChoice = optionsVoting.some(
        (choice) => choice.id === votingOptionChoiceId
      );
      if (!isValidChoice) {
        throw new Error(
          `Invalid voting option choice: ${votingOptionChoiceId} for voting ${votingId}`
        );
      }
      const newVote: OptionsVote = {
        id: Math.max(...this.optionsVotes.map((e) => e.id)) + 1,
        votingId,
        userId,
        votingOptionChoiceId,
      };
      this.optionsVotes.push(newVote);
      return { ...newVote };
    });
  }
}

export const optionsVoteServiceInstance = new OptionsVoteServiceImpl();
