import { generateNextId } from "@/services/serviceUtilsImpl";
import {
  AwardTriad,
  AwardTriadDetail,
  TriadItemData,
} from "../../models/award";
import { awardTriadServiceMockResponse } from "./awardTriadServiceResponse";
import { awardTriadNomineeServiceInstance } from "../awardTriadNominee/awardTriadNomineeServiceImpl";

export class AwardTriadServiceImpl {
  private awardTriads: AwardTriad[] = [...awardTriadServiceMockResponse];

  createInstantAwardTriads(awardId: number, triads: TriadItemData[]) {
    triads.forEach((triad) => {
      const id = generateNextId(this.awardTriads);
      const newAwardTriad: AwardTriad = {
        ...triad,
        id,
        awardId,
      };
      this.awardTriads.push(newAwardTriad);

      awardTriadNomineeServiceInstance.createInstantAwardTriadNominees(
        id,
        triad.nominees
      );
    });
  }

  getInstantAwardTriadDetailsByAwardId(awardId: number): AwardTriadDetail[] {
    const triads = this.awardTriads.filter(
      (triad) => triad.awardId === awardId
    );
    return triads.map((triad) => ({
      ...triad,
      nominees:
        awardTriadNomineeServiceInstance.getInstantAwardTriadNomineesByTriadId(
          triad.id
        ),
    }));
  }
}

export const awardTriadServiceInstance = new AwardTriadServiceImpl();
