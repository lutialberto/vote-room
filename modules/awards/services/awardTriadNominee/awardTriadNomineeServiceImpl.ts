import { generateNextId } from "@/services/serviceUtilsImpl";
import { AwardTriadNominee } from "../../models/award";
import { awardTriadNomineeServiceMockResponse } from "./awardTriadNomineeServiceResponse";

export class AwardTriadNomineeServiceImpl {
  private awardTriadNominees: AwardTriadNominee[] = [
    ...awardTriadNomineeServiceMockResponse,
  ];

  createInstantAwardTriadNominees(awardTriadId: number, nominees: string[]) {
    nominees.forEach((nominee) => {
      const id = generateNextId(this.awardTriadNominees);
      const newAwardTriad: AwardTriadNominee = {
        name: nominee,
        id,
        awardTriadId,
      };
      this.awardTriadNominees.push(newAwardTriad);
    });
  }

  getInstantAwardTriadNomineesByTriadId(awardTriadId: number) {
    return this.awardTriadNominees.filter(
      (nominee) => nominee.awardTriadId === awardTriadId
    );
  }
}

export const awardTriadNomineeServiceInstance =
  new AwardTriadNomineeServiceImpl();
