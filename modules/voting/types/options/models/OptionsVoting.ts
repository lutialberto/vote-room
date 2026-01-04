import { BaseVoting, BaseVotingForCreation } from "../../../models/Voting";

export interface OptionsVotingChoice {
  id: number;
  label: string;
  optionsVotingId: number;
}

export type OptionsVotingChoiceReference = Omit<
  OptionsVotingChoice,
  "optionsVotingId"
>;

export default interface OptionsVoting {
  id: number;
  baseVotingId: number;
  baseVoting: BaseVoting;
  type: "options";
  options: OptionsVotingChoiceReference[];
}

export type OptionsVotingRecord = Omit<
  OptionsVoting,
  "type" | "baseVoting" | "options"
>;

export type OptionsVotingForCreation = {
  baseVoting: BaseVotingForCreation;
  options: string[];
};
