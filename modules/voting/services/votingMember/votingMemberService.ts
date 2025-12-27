import { VotingMember } from "../../models/VotingMember";
import { votingMemberServiceInstance } from "./votingMemberServiceImpl";

export function addVotingMember({
  userId,
  votingId,
}: {
  votingId: number;
  userId: number;
}): Promise<VotingMember> {
  return votingMemberServiceInstance.addVotingMember(votingId, userId);
}
