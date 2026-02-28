import { create } from "zustand";
import { AwardBaseData, TriadItemData } from "../../models/award";

export interface NewAwardStepState {
  awardBaseData: AwardBaseData | undefined;
  triadsData: TriadItemData[];
  saveBaseData: (data: AwardBaseData) => void;
  saveTriadsData: (data: TriadItemData[]) => void;
  resetAwardData: () => void;
}

export const useNewAwardSteps = create<NewAwardStepState>((set) => ({
  awardBaseData: undefined,
  triadsData: [],
  saveBaseData: (data: AwardBaseData) => set({ awardBaseData: data }),
  saveTriadsData: (data: TriadItemData[]) => set({ triadsData: data }),
  resetAwardData: () => set({ awardBaseData: undefined, triadsData: [] }),
}));
