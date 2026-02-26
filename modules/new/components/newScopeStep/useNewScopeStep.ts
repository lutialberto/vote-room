import { MembersType } from "@/models/ScopeConfig";
import { create } from "zustand";

export interface NewScopeStepState {
  isPrivate: boolean;
  membersType: MembersType;
  saveIsPrivate: (isPrivate: boolean) => void;
  saveMembersType: (membersType: MembersType) => void;
  resetScopeConfigData: () => void;
}

export const useNewScopeStep = create<NewScopeStepState>((set) => ({
  isPrivate: false,
  membersType: "unrestricted",
  saveIsPrivate: (isPrivate: boolean) => set({ isPrivate }),
  saveMembersType: (membersType: MembersType) => set({ membersType }),
  resetScopeConfigData: () =>
    set({ isPrivate: false, membersType: "unrestricted" }),
}));
