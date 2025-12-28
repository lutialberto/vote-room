import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { BOOLEAN_VOTE_MOCK_RESPONSE } from "./booleanVoteServiceResponse";
import { votingServiceInstance } from "../../../../services/voting/votingServiceImpl";
import { BooleanVote } from "../../models/BooleanVote";

export class VoteServiceImpl {
  private booleanVotes: BooleanVote[] = [...BOOLEAN_VOTE_MOCK_RESPONSE];

  async fetchBooleanVotesByVotingId(votingId: number): Promise<BooleanVote[]> {
    return successPromiseBehavior(() => [
      ...this.booleanVotes.filter((vote) => vote.votingId === votingId),
    ]);
  }

  async castBooleanVote(
    votingId: number,
    userId: number,
    choice: boolean
  ): Promise<BooleanVote> {
    return successPromiseBehavior(() => {
      const vote = votingServiceInstance.getInstantBaseVotingById(votingId);
      if (!vote) {
        throw new Error("Voting not found");
      }

      if (vote.status !== "active") {
        throw new Error("Voting is not active");
      }
      const existingVote = this.booleanVotes.find(
        (vote) => vote.votingId === votingId && vote.userId === userId
      );
      if (existingVote) {
        throw new Error("User has already voted in this voting.");
      }
      const newVote: BooleanVote = {
        id: Math.max(...this.booleanVotes.map((e) => e.id)) + 1,
        votingId,
        userId,
        choice,
      };
      this.booleanVotes.push(newVote);
      return { ...newVote };
    });
  }
}

export const booleanVoteServiceInstance = new VoteServiceImpl();
