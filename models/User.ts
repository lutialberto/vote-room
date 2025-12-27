export interface User {
  id: number;
  userName: string;
  email: string;
  name: string;
}

export type Owner = Pick<User, "id" | "userName">;
