import { BASE_VOTING_MOCK_RESPONSE } from "./votingServiceResponse";
import { BaseVoting } from "../../models/Voting";

/**
 * Core service with voting data access - no external service dependencies
 * Used to break circular dependencies between votingService and votingMemberService
 */
export class VotingCoreService {
  private votings: BaseVoting[] = [...BASE_VOTING_MOCK_RESPONSE];

  getInstantBaseVotings(): BaseVoting[] {
    return [...this.votings];
  }

  getInstantBaseVotingById(id: number): BaseVoting | undefined {
    return this.votings.find((voting) => voting.id === id);
  }

  addInstantBaseVoting(voting: BaseVoting): void {
    this.votings.push(voting);
  }

  updateInstantBaseVoting(updatedVoting: BaseVoting): void {
    this.votings = this.votings.map((voting) =>
      voting.id === updatedVoting.id ? updatedVoting : voting
    );
  }
}

export const votingCoreService = new VotingCoreService();
