import { create } from "zustand";

export interface NewAwardStepState {
  awardBaseData: AwardBaseData | undefined;
  triadsData: TriadItemData[];
  saveBaseData: (data: AwardBaseData) => void;
  saveTriadsData: (data: TriadItemData[]) => void;
  resetAwardData: () => void;
}

export interface AwardBaseData {
  name: string;
  description: string;
  tags: string[];
  votingStage: {
    startDate: Date;
    endDate: Date;
  };
  awardDate: Date;
  releaseDate: Date;
}

export interface TriadItemData {
  name: string;
  nominees: string[];
}

export const useNewAwardSteps = create<NewAwardStepState>((set) => ({
  awardBaseData: undefined,
  triadsData: [],
  saveBaseData: (data: AwardBaseData) => set({ awardBaseData: data }),
  saveTriadsData: (data: TriadItemData[]) => set({ triadsData: data }),
  resetAwardData: () => set({ awardBaseData: undefined, triadsData: [] }),
}));
