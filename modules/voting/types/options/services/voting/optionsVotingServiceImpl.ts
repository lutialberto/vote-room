import { BaseVotingForCreation } from "@/modules/voting/models/Voting";
import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { votingServiceInstance } from "@/modules/voting/services/voting/votingServiceImpl";
import OptionsVoting, { OptionsVotingRecord } from "../../models/OptionsVoting";
import { OPTIONS_VOTING_SERVICE_RESPONSE_MOCK } from "./optionsVotingServiceResponse";
import { optionsVotingChoiceServiceInstance } from "../choice/optionsVotingChoiceServiceImpl";
import { userServiceInstance } from "@/services/user/userServiceImpl";

export class OptionsVotingServiceImpl {
  private votings: OptionsVotingRecord[] = [
    ...OPTIONS_VOTING_SERVICE_RESPONSE_MOCK,
  ];

  async createOptionsVoting(
    baseData: BaseVotingForCreation,
    userId: number,
    options: string[]
  ): Promise<OptionsVoting> {
    return successPromiseBehavior(() => {
      const baseVoting = votingServiceInstance.createInstantBaseVoting(
        baseData,
        userId
      );
      const newOptionsVoting: OptionsVotingRecord = {
        id: Math.max(...this.votings.map((e) => e.id)) + 1,
        baseVotingId: baseVoting.id,
      };
      this.votings.push(newOptionsVoting);
      const choices =
        optionsVotingChoiceServiceInstance.createOptionsVotingChoices(
          newOptionsVoting.id,
          options
        );
      return {
        ...newOptionsVoting,
        baseVoting: { ...baseVoting },
        type: "options",
        options: choices,
      };
    });
  }

  async updateOptionsVoting(
    votingId: number,
    userId: number,
    options: string[]
  ): Promise<OptionsVoting> {
    return successPromiseBehavior(() => {
      const baseVoting =
        votingServiceInstance.getInstantBaseVotingById(votingId);
      if (!baseVoting) {
        throw new Error("Base voting not found");
      }
      const isOwner = baseVoting.owner.id === userId;
      if (!isOwner) {
        throw new Error("User is not the owner of the voting");
      }
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const optionsVotingToUpdate = this.votings.find((e) => e.id === votingId);
      if (!optionsVotingToUpdate) {
        throw new Error("Options voting not found");
      }
      const choices =
        optionsVotingChoiceServiceInstance.updateOptionsVotingChoices(
          votingId,
          options
        );
      return {
        ...optionsVotingToUpdate,
        baseVoting,
        type: "options",
        options: choices,
      };
    });
  }

  getInstantOptionsVotingById(id: number): OptionsVoting | undefined {
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
    const options =
      optionsVotingChoiceServiceInstance.getInstantOptionsVotingChoicesByOptionsVotingId(
        record.id
      );
    return {
      ...record,
      baseVotingId: record.baseVotingId,
      baseVoting,
      type: "options",
      options,
    };
  }

  getInstantOptionsVotingByVotingId(
    votingId: number
  ): OptionsVoting | undefined {
    const record = this.votings.find(
      (voting) => voting.baseVotingId === votingId
    );
    if (!record) {
      throw new Error("Voting not found");
    }
    const baseVoting = votingServiceInstance.getInstantBaseVotingById(
      record.baseVotingId
    );
    if (!baseVoting) {
      throw new Error("Base voting not found");
    }
    const options =
      optionsVotingChoiceServiceInstance.getInstantOptionsVotingChoicesByOptionsVotingId(
        record.id
      );
    return {
      ...record,
      baseVotingId: record.baseVotingId,
      baseVoting,
      type: "options",
      options,
    };
  }

  async fetchOptionsVotingById(id: number): Promise<OptionsVoting> {
    return successPromiseBehavior(() => {
      const voting = this.getInstantOptionsVotingById(id);
      if (!voting) {
        throw new Error("Voting not found");
      }
      return { ...voting };
    });
  }

  async fetchOptionsVotingByVotingId(votingId: number): Promise<OptionsVoting> {
    return successPromiseBehavior(() => {
      const voting = this.getInstantOptionsVotingByVotingId(votingId);
      if (!voting) {
        throw new Error("Voting not found");
      }
      return { ...voting };
    });
  }
}

export const optionsVotingServiceInstance = new OptionsVotingServiceImpl();
