export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

export type Owner = Pick<User, "id" | "username">;
