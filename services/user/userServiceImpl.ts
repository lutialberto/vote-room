import {
  User,
  UserEmailForCreation,
  UserSimpleForCreation,
} from "@/models/User";
import { USER_MOCK_RESPONSE } from "./userServiceResponse";
import { successPromiseBehavior } from "../serviceUtilsImpl";

export class UserServiceImpl {
  private users: User[] = [...USER_MOCK_RESPONSE];

  getInstantUsers(): User[] {
    return [...this.users];
  }

  async fetchUsers(): Promise<User[]> {
    return successPromiseBehavior(() => {
      return this.getInstantUsers();
    });
  }

  async createUserSimple(user: UserSimpleForCreation): Promise<User> {
    return successPromiseBehavior(() => {
      const newUser: User = {
        id: this.users.length + 1,
        userName: user.userName,
        type: "name",
      };
      this.users.push(newUser);
      return newUser;
    });
  }

  async createUserEmail(user: UserEmailForCreation): Promise<User> {
    return successPromiseBehavior(() => {
      const newUser: User = {
        id: this.users.length + 1,
        userName: user.userName,
        email: user.email,
        password: user.password,
        type: "email",
      };
      this.users.push(newUser);
      return newUser;
    });
  }

  async updateUserEmailPassword(data: {
    email: string;
    password: string;
  }): Promise<User> {
    return successPromiseBehavior(() => {
      const user = this.getInstantUserByEmail(data.email);
      if (!user || user.type !== "email") {
        throw new Error(`User not found with email: '${data.email}'`);
      }
      user.password = data.password;
      return user;
    });
  }

  getInstantUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
  getInstantUserByEmail(email: string): User | undefined {
    return this.users.find(
      (user) => user.type === "email" && user.email === email
    );
  }
  getInstantUserByUserName(userName: string): User | undefined {
    return this.users.find((user) => user.userName === userName);
  }

  async fetchUserById(id: number): Promise<User> {
    return successPromiseBehavior(() => {
      const user = this.getInstantUserById(id);
      if (!user) {
        throw new Error(`User not found with id: ${id}`);
      }
      return { ...user };
    });
  }

  async fetchUserByCredentials(email: string, password: string): Promise<User> {
    return successPromiseBehavior(() => {
      const user = this.getInstantUserByEmail(email);
      if (!user || user.type !== "email" || user.password !== password) {
        throw new Error(`User not found with email: '${email}'`);
      }
      return { ...user };
    });
  }

  async checkUserByEmail(email: string): Promise<boolean> {
    return successPromiseBehavior(() => {
      const user = this.getInstantUserByEmail(email);
      if (!user || user.type !== "email") {
        return false;
      }
      return true;
    });
  }

  async fetchUserByUserName(userName: string): Promise<User> {
    return successPromiseBehavior(() => {
      const user = this.getInstantUserByUserName(userName);
      if (!user) {
        throw new Error(`User not found with userName: '${userName}'`);
      }
      return { ...user };
    });
  }
}
export const userServiceInstance = new UserServiceImpl();
