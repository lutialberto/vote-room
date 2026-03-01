import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { userServiceInstance } from "@/services/user/userServiceImpl";
import { awardServiceInstance } from "../award/awardServiceImpl";
import { AwardMember } from "../../models/awardMember";
import { AWARD_MEMBER_MOCK_RESPONSE } from "./awardMemberServiceResponse";

export class AwardMemberServiceImpl {
  private awardMembers: AwardMember[] = [...AWARD_MEMBER_MOCK_RESPONSE];

  getInstantAwardMembersByAwardId(awardId: number): AwardMember[] {
    return this.awardMembers.filter((member) => member.awardId === awardId);
  }
  getInstantAwardMembersByUserId(userId: number): AwardMember[] {
    return this.awardMembers.filter((member) => member.userId === userId);
  }
  async fetchAwardMembersByAwardId(awardId: number): Promise<AwardMember[]> {
    return successPromiseBehavior(() =>
      this.getInstantAwardMembersByAwardId(awardId)
    );
  }
  async fetchAwardMembersByUserId(userId: number): Promise<AwardMember[]> {
    return successPromiseBehavior(() =>
      this.getInstantAwardMembersByUserId(userId)
    );
  }
  addInstantAwardMember(awardId: number, userId: number): AwardMember {
    const user = userServiceInstance.getInstantUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const award = awardServiceInstance.getInstantAwardById(awardId);
    if (!award) {
      throw new Error("Award not found");
    }

    const existingMember = this.awardMembers.find(
      (member) => member.userId === userId && member.awardId === awardId
    );
    if (existingMember) {
      throw new Error("User is already a member of this award");
    }
    const newMember: AwardMember = {
      id: Math.max(...this.awardMembers.map((e) => e.id)) + 1,
      awardId,
      userId,
    };
    this.awardMembers.push(newMember);
    return { ...newMember };
  }
  async addAwardMember(awardId: number, userId: number): Promise<AwardMember> {
    return successPromiseBehavior(() =>
      this.addInstantAwardMember(awardId, userId)
    );
  }
}

export const awardMemberServiceInstance = new AwardMemberServiceImpl();
