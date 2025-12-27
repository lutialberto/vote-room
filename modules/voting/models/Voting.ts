export type VotingStatus = "draft" | "active" | "closed" | "scheduled";

export type VotingCloseType = "programmedClose" | "manualClose";
export type VotingReleaseType =
  | "releaseOnCreate"
  | "releaseScheduled"
  | "manualRelease";

export interface Vote {
  id: number;
  userId: number;
  votingId: number;
  choice: boolean;
}
