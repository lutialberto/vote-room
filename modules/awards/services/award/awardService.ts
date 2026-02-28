import {
  Award,
  AwardBaseData,
  AwardDetail,
  TriadItemData,
} from "../../models/award";
import { awardServiceInstance } from "./awardServiceImpl";

export function createAward(
  userId: number,
  baseData: AwardBaseData,
  triads: TriadItemData[]
): Promise<number> {
  return awardServiceInstance.createAward(userId, baseData, triads);
}

export function fetchAwardDetailById(id: number): Promise<AwardDetail> {
  return awardServiceInstance.fetchAwardDetailById(id);
}

export function fetchAwardById(id: number): Promise<Award> {
  return awardServiceInstance.fetchAwardById(id);
}
