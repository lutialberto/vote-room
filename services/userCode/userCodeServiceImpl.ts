import { UserCode } from "@/models/UserCode";
import { successPromiseBehavior } from "../serviceUtilsImpl";

export class UserCodeServiceImpl {
  private usersCodes: UserCode[] = [];

  async createUserCode(email: string): Promise<{ email: string }> {
    return successPromiseBehavior(() => {
      this.usersCodes = this.usersCodes.map((e) => {
        if (e.email === email && e.active) {
          return { ...e, active: false };
        } else {
          return e;
        }
      });
      const newUserCode: UserCode = {
        id: this.usersCodes.length + 1,
        email,
        validated: false,
        active: true,
        code: Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0"),
      };
      this.usersCodes.push(newUserCode);
      console.log(
        `User code created for email: ${email}, code: ${newUserCode.code}`
      );
      return { email };
    });
  }

  async validateEmailCode(data: {
    email: string;
    code: string;
  }): Promise<boolean> {
    return successPromiseBehavior(() => {
      const userCode = this.usersCodes.find(
        (e) => e.email === data.email && e.code === data.code && e.active
      );
      if (!userCode) {
        return false;
      }
      userCode.validated = true;
      userCode.active = false;
      return true;
    });
  }
}
export const userCodeServiceInstance = new UserCodeServiceImpl();
