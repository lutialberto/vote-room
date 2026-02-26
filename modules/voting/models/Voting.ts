import { UserBase } from "@/models/User";
import { ScopeConfig } from "@/models/ScopeConfig";
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
  owner: UserBase;
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
  scope: ScopeConfig;
}

export type BaseVotingForCreation = Pick<
  BaseVoting,
  "question" | "description" | "type"
>;
export type BaseVotingAdvancedForCreation = Pick<
  BaseVoting,
  "close" | "release" | "scope"
>;

export type Voting = BooleanVoting | OptionsVoting;
