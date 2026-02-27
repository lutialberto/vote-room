import {
  BaseVoting,
  BaseVotingAdvancedForCreation,
  BaseVotingForCreation,
  PublicVotingType,
  PublicVotingTypeFilter,
} from "../../models/Voting";
import { votingServiceInstance } from "./votingServiceImpl";

export const updateBaseVoting = ({
  data,
  advancedData,
  id,
  userId,
}: {
  data: BaseVotingForCreation;
  advancedData: BaseVotingAdvancedForCreation;
  id: number;
  userId: number;
}): Promise<BaseVoting> =>
  votingServiceInstance.updateBaseVoting(data, advancedData, id, userId);

export const activateBaseVoting = ({
  id,
  userId,
}: {
  id: number;
  userId: number;
}): Promise<BaseVoting> => votingServiceInstance.activateBaseVoting(id, userId);

export const closeBaseVoting = ({
  id,
  userId,
}: {
  id: number;
  userId: number;
}): Promise<BaseVoting> => votingServiceInstance.closeBaseVoting(id, userId);

export const fetchBaseVotingById = (id: number): Promise<BaseVoting> =>
  votingServiceInstance.fetchBaseVotingById(id);

export const fetchBaseVotingsByFilter = (
  userId: number,
  roomId?: string
): Promise<BaseVoting[]> =>
  votingServiceInstance.fetchBaseVotingsByFilter(userId, roomId);

export const fetchPublicVotings = (
  userId: number,
  filter: PublicVotingTypeFilter
): Promise<PublicVotingType[]> =>
  votingServiceInstance.fetchPublicVotings(userId, filter);
