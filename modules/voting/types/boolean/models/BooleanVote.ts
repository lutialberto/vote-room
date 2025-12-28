import { BaseVote } from "@/modules/voting/models/Vote";

export interface BooleanVote extends BaseVote {
  choice: boolean;
}
