import { User } from "@/models/User";
import { USER_MOCK_RESPONSE } from "./userServiceResponse";
import { successPromiseBehavior } from "../serviceUtilsImpl";

export class UserServiceImpl {
  private users: User[] = [...USER_MOCK_RESPONSE];

  getInstantUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
  getInstantUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
  getInstantUserByUserName(userName: string): User | undefined {
    return this.users.find((user) => user.userName === userName);
  }

  async fetchUserById(id: number): Promise<User> {
    return successPromiseBehavior(() => {
      const user = this.getInstantUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return { ...user };
    });
  }

  async fetchUserByEmail(email: string): Promise<User> {
    return successPromiseBehavior(() => {
      const user = this.getInstantUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      return { ...user };
    });
  }

  async fetchUserByUserName(userName: string): Promise<User> {
    return successPromiseBehavior(() => {
      const user = this.getInstantUserByUserName(userName);
      if (!user) {
        throw new Error("User not found");
      }
      return { ...user };
    });
  }
}
export const userServiceInstance = new UserServiceImpl();
