import { BaseVote } from "@/modules/voting/models/Vote";

export interface OptionsVote extends BaseVote {
  votingOptionChoiceId: number;
}
