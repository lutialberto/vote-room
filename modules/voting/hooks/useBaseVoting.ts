import { create } from "zustand";
import { BaseVotingForCreation } from "../models/Voting";

const INIT: BaseVotingForCreation | null = null;

type BaseVotingState = {
  data: BaseVotingForCreation | null;
  saveBaseVotingData: (data: BaseVotingForCreation) => void;
  resetBaseVotingData: () => void;
};

export const useBaseVoting = create<BaseVotingState>((set) => ({
  data: INIT,
  saveBaseVotingData: (data: BaseVotingForCreation) => set({ data }),
  resetBaseVotingData: () => set({ data: INIT }),
}));
