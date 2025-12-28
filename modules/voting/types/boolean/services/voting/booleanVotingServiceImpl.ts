import { BASE_VOTING_MOCK_RESPONSE } from "@/modules/voting/services/voting/votingServiceResponse";
import BooleanVoting, { BooleanVotingRecord } from "../../models/BooleanVoting";
import { BOOLEAN_VOTING_SERVICE_RESPONSE_MOCK } from "./booleanVotingServiceResponse";
import {
  BaseVotingForCreation,
  VotingReleaseType,
  VotingStatus,
} from "@/modules/voting/models/Voting";
import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { userServiceInstance } from "@/services/user/userServiceImpl";
import { votingServiceInstance } from "@/modules/voting/services/voting/votingServiceImpl";

export class BooleanVotingServiceImpl {
  private votings: BooleanVotingRecord[] = [
    ...BOOLEAN_VOTING_SERVICE_RESPONSE_MOCK,
  ];

  async createBooleanVoting(
    data: BaseVotingForCreation,
    userId: number
  ): Promise<BooleanVoting> {
    return successPromiseBehavior(() => {
      const baseVoting = votingServiceInstance.createInstantBaseVoting(
        data,
        userId
      );
      const newBooleanVoting: BooleanVotingRecord = {
        id: Math.max(...this.votings.map((e) => e.id)) + 1,
        baseVotingId: baseVoting.id,
      };
      this.votings.push(newBooleanVoting);
      return {
        ...newBooleanVoting,
        baseVoting: { ...baseVoting },
        type: "boolean",
      };
    });
  }

  getInstantBooleanVotingById(id: number): BooleanVoting | undefined {
    const record = this.votings.find((voting) => voting.id === id);
    if (!record) {
      throw new Error("Voting not found");
    }
    const baseVoting = votingServiceInstance.getInstantBaseVotingById(
      record.baseVotingId
    );
    if (!baseVoting) {
      throw new Error("Base voting not found");
    }
    return {
      ...record,
      baseVotingId: record.baseVotingId,
      baseVoting,
      type: "boolean",
    };
  }

  async fetchBooleanVotingById(id: number): Promise<BooleanVoting> {
    return successPromiseBehavior(() => {
      const voting = this.getInstantBooleanVotingById(id);
      if (!voting) {
        throw new Error("Voting not found");
      }
      return { ...voting };
    });
  }
}

export const booleanVotingServiceInstance = new BooleanVotingServiceImpl();
