import {
  BaseVotingAdvancedForCreation,
  BaseVotingForCreation,
} from "@/modules/voting/models/Voting";
import { optionsVotingServiceInstance } from "./optionsVotingServiceImpl";
import OptionsVoting from "../../models/OptionsVoting";

export const createOptionsVoting = ({
  baseData,
  advancedData,
  userId,
  options,
}: {
  baseData: BaseVotingForCreation;
  advancedData: BaseVotingAdvancedForCreation;
  userId: number;
  options: string[];
}): Promise<OptionsVoting> =>
  optionsVotingServiceInstance.createOptionsVoting(
    baseData,
    advancedData,
    userId,
    options
  );

export const updateOptionsVoting = ({
  votingId,
  userId,
  options,
}: {
  votingId: number;
  userId: number;
  options: string[];
}): Promise<OptionsVoting> =>
  optionsVotingServiceInstance.updateOptionsVoting(votingId, userId, options);

export const fetchOptionsVotingById = (id: number): Promise<OptionsVoting> =>
  optionsVotingServiceInstance.fetchOptionsVotingById(id);

export const fetchOptionsVotingByVotingId = (
  votingId: number
): Promise<OptionsVoting> =>
  optionsVotingServiceInstance.fetchOptionsVotingByVotingId(votingId);
