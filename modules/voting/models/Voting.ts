import { User } from "@/models/User";
import BooleanVoting from "../types/boolean/models/BooleanVoting";
import OptionsVoting from "../types/options/models/OptionsVoting";
import { VotingType } from "./VotingType";

export type VotingStatus = "draft" | "active" | "closed" | "scheduled";

export type VotingCloseType = "programmedClose" | "manualClose";
export type VotingReleaseType =
  | "releaseOnCreate"
  | "releaseScheduled"
  | "manualRelease";

export interface BaseVoting {
  id: number;
  question: string;
  description?: string;
  owner: User;
  close: {
    type: VotingCloseType;
    durationMinutes?: number;
    closedAt?: Date;
  };
  status: VotingStatus;
  release: {
    type: VotingReleaseType;
    date?: Date;
  };
  type: VotingType;
}

export type BaseVotingForCreation = Omit<BaseVoting, "id" | "owner" | "status">;

export type Voting = BooleanVoting | OptionsVoting;
