import { UserBase } from "@/models/User";

export interface Award {
  id: number;
  name: string;
  owner: UserBase;
  description: string;
  tags: string[];
  votingStage: {
    startDate: Date;
    endDate: Date;
  };
  awardDate: Date;
  releaseDate: Date;
}

export interface AwardDetail extends Award {
  triads: AwardTriadDetail[];
}

export interface AwardTriad {
  id: number;
  awardId: number;
  name: string;
}

export interface AwardTriadDetail extends AwardTriad {
  nominees: AwardTriadNominee[];
}

export interface AwardTriadNominee {
  id: number;
  awardTriadId: number;
  name: string;
}

export type AwardBaseData = Omit<Award, "id" | "owner">;

export interface TriadItemData {
  name: string;
  nominees: string[];
}
