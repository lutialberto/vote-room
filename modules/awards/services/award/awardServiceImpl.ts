import {
  generateNextId,
  successPromiseBehavior,
} from "@/services/serviceUtilsImpl";
import {
  Award,
  AwardBaseData,
  AwardDetail,
  TriadItemData,
} from "../../models/award";
import { awardServiceMockResponse } from "./awardServiceResponse";
import { awardTriadServiceInstance } from "../awardTriad/awardTriadServiceImpl";
import { userServiceInstance } from "@/services/user/userServiceImpl";

export class AwardServiceImpl {
  private awards: Award[] = [...awardServiceMockResponse];

  async createAward(
    userId: number,
    baseData: AwardBaseData,
    triads: TriadItemData[]
  ): Promise<number> {
    return successPromiseBehavior(() => {
      const owner = userServiceInstance.getInstantUserById(userId);
      if (!owner) {
        throw new Error(`User with id ${userId} not found`);
      }

      const id = generateNextId(this.awards);
      const newAward: Award = {
        ...baseData,
        owner,
        id,
      };
      this.awards.push(newAward);

      awardTriadServiceInstance.createInstantAwardTriads(id, triads);
      return newAward.id;
    });
  }

  async fetchAwardDetailById(id: number): Promise<AwardDetail> {
    return successPromiseBehavior(() => {
      const award = this.getInstantAwardById(id);

      const triads =
        awardTriadServiceInstance.getInstantAwardTriadDetailsByAwardId(id);

      return {
        ...award,
        triads,
      };
    });
  }

  getInstantAwardById(id: number): Award {
    const award = this.awards.find((award) => award.id === id);
    if (!award) {
      throw new Error(`Award with id ${id} not found`);
    }

    return award;
  }

  fetchAwardById(id: number): Promise<Award> {
    return successPromiseBehavior(() => this.getInstantAwardById(id));
  }
}

export const awardServiceInstance = new AwardServiceImpl();
