import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { Vote } from "../../models/Voting";
import { VOTE_MOCK_RESPONSE } from "./voteServiceResponse";
import { votingServiceInstance } from "../voting/votingServiceImpl";

export class VoteServiceImpl {
  private votes: Vote[] = [...VOTE_MOCK_RESPONSE];

  async fetchVotesByVotingId(votingId: number): Promise<Vote[]> {
    return successPromiseBehavior(() => [
      ...this.votes.filter((vote) => vote.votingId === votingId),
    ]);
  }

  async castVote(
    votingId: number,
    userId: number,
    choice: boolean
  ): Promise<Vote> {
    return successPromiseBehavior(() => {
      const poll =
        votingServiceInstance.getInstantQuickBooleanPollById(votingId);
      if (!poll) {
        throw new Error("Voting not found");
      }

      if (poll.status !== "active") {
        throw new Error("Voting is not active");
      }
      const existingVote = this.votes.find(
        (vote) => vote.votingId === votingId && vote.userId === userId
      );
      if (existingVote) {
        throw new Error("User has already voted in this voting.");
      }
      const newVote: Vote = {
        id: Math.max(...this.votes.map((e) => e.id)) + 1,
        votingId,
        userId,
        choice,
      };
      this.votes.push(newVote);
      return { ...newVote };
    });
  }
}

export const voteServiceInstance = new VoteServiceImpl();
