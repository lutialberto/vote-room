import { AwardMember } from "../../models/awardMember";
import { awardMemberServiceInstance } from "./awardMemberServiceImpl";

export function addAwardMember({
  userId,
  awardId,
}: {
  awardId: number;
  userId: number;
}): Promise<AwardMember> {
  return awardMemberServiceInstance.addAwardMember(awardId, userId);
}

export function fetchAwardMembersByUserId({
  userId,
}: {
  userId: number;
}): Promise<AwardMember[]> {
  return awardMemberServiceInstance.fetchAwardMembersByUserId(userId);
}
