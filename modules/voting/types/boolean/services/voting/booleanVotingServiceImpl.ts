import BooleanVoting, { BooleanVotingRecord } from "../../models/BooleanVoting";
import { BOOLEAN_VOTING_SERVICE_RESPONSE_MOCK } from "./booleanVotingServiceResponse";
import { BaseVotingForCreation } from "@/modules/voting/models/Voting";
import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { votingServiceInstance } from "@/modules/voting/services/voting/votingServiceImpl";
import { votingCoreService } from "@/modules/voting/services/voting/votingCoreService";

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
      throw new Error(`Voting not found with id: ${id}`);
    }
    const baseVoting = votingCoreService.getInstantBaseVotingById(
      record.baseVotingId
    );
    if (!baseVoting) {
      throw new Error(`Base voting not found with id: ${record.baseVotingId}`);
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
        throw new Error(`Voting not found with id: ${id}`);
      }
      return { ...voting };
    });
  }
}

export const booleanVotingServiceInstance = new BooleanVotingServiceImpl();
