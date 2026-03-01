import { Award } from "../../models/award";
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

export function fetchAwardsByUserId({
  userId,
}: {
  userId: number;
}): Promise<Award[]> {
  return awardMemberServiceInstance.fetchAwardsByUserId(userId);
}
