import { create } from "zustand";
import {
  BaseVotingAdvancedForCreation,
  BaseVotingForCreation,
} from "../models/Voting";

type BaseVotingState = {
  data: BaseVotingForCreation | null;
  advancedData: BaseVotingAdvancedForCreation;
  saveBaseVotingData: (data: BaseVotingForCreation) => void;
  saveBaseVotingAdvancedData: (data: BaseVotingAdvancedForCreation) => void;
  resetBaseVotingData: () => void;
};

const ADVANCED_DEFAULT_DATA: BaseVotingAdvancedForCreation = {
  close: {
    type: "manualClose",
    durationMinutes: undefined,
  },
  release: {
    type: "releaseOnCreate",
  },
  scope: {
    isPrivate: false,
    membersType: "unrestricted",
  },
};

export const useBaseVoting = create<BaseVotingState>((set) => ({
  data: null,
  advancedData: ADVANCED_DEFAULT_DATA,
  saveBaseVotingData: (data: BaseVotingForCreation) => set({ data }),
  saveBaseVotingAdvancedData: (advancedData: BaseVotingAdvancedForCreation) =>
    set({ advancedData }),
  resetBaseVotingData: () =>
    set({ data: null, advancedData: ADVANCED_DEFAULT_DATA }),
}));
