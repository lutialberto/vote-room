import { BaseVotingForCreation } from "@/modules/voting/models/Voting";
import BooleanVoting from "../../models/BooleanVoting";
import { booleanVotingServiceInstance } from "./booleanVotingServiceImpl";

export const createBooleanVoting = ({
  data,
  userId,
}: {
  data: BaseVotingForCreation;
  userId: number;
}): Promise<BooleanVoting> =>
  booleanVotingServiceInstance.createBooleanVoting(data, userId);

export const fetchBooleanVotingById = (id: number): Promise<BooleanVoting> =>
  booleanVotingServiceInstance.fetchBooleanVotingById(id);
