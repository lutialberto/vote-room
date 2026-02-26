import {
  BaseVotingAdvancedForCreation,
  BaseVotingForCreation,
} from "@/modules/voting/models/Voting";
import BooleanVoting from "../../models/BooleanVoting";
import { booleanVotingServiceInstance } from "./booleanVotingServiceImpl";

export const createBooleanVoting = ({
  data,
  advancedData,
  userId,
}: {
  data: BaseVotingForCreation;
  advancedData: BaseVotingAdvancedForCreation;
  userId: number;
}): Promise<BooleanVoting> =>
  booleanVotingServiceInstance.createBooleanVoting(data, advancedData, userId);

export const fetchBooleanVotingById = (id: number): Promise<BooleanVoting> =>
  booleanVotingServiceInstance.fetchBooleanVotingById(id);
