import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { VotingMember } from "../../models/VotingMember";
import { VOTING_MEMBER_MOCK_RESPONSE } from "./votingMemberServiceResponse";
import { userServiceInstance } from "@/services/user/userServiceImpl";
import { votingServiceInstance } from "../voting/votingServiceImpl";

export class VotingServiceImpl {
  private votingMembers: VotingMember[] = [...VOTING_MEMBER_MOCK_RESPONSE];

  getInstantVotingMembersByVotingId(votingId: number): VotingMember[] {
    return this.votingMembers.filter((member) => member.votingId === votingId);
  }
  getInstantVotingMembersByUserId(userId: number): VotingMember[] {
    return this.votingMembers.filter((member) => member.userId === userId);
  }
  async fetchVotingMembersByVotingId(
    votingId: number
  ): Promise<VotingMember[]> {
    return successPromiseBehavior(() =>
      this.getInstantVotingMembersByVotingId(votingId)
    );
  }
  async fetchVotingMembersByUserId(userId: number): Promise<VotingMember[]> {
    return successPromiseBehavior(() =>
      this.getInstantVotingMembersByUserId(userId)
    );
  }
  async addVotingMember(
    votingId: number,
    userId: number
  ): Promise<VotingMember> {
    return successPromiseBehavior(() => {
      const user = userServiceInstance.getInstantUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const voting =
        votingServiceInstance.getInstantQuickBooleanPollById(votingId);
      if (!voting) {
        throw new Error("Voting not found");
      }

      const existingMember = this.votingMembers.find(
        (member) => member.userId === userId && member.votingId === votingId
      );
      if (existingMember) {
        throw new Error("User is already a member of this voting");
      }
      const newMember: VotingMember = {
        id: Math.max(...this.votingMembers.map((e) => e.id)) + 1,
        votingId,
        userId,
      };
      this.votingMembers.push(newMember);
      return { ...newMember };
    });
  }
}

export const votingMemberServiceInstance = new VotingServiceImpl();
