export type UserType = "email" | "kyc" | "name";

export interface UserBase {
  id: number;
  userName: string;
  type: UserType;
}

export type UserEmail = UserBase & {
  type: "email";
  email: string;
  password: string;
};

export type UserSimpleForCreation = Omit<UserSimple, "id" | "type">;
export type UserEmailForCreation = Omit<UserEmail, "id" | "type">;

export type UserForm = Omit<UserEmail, "id" | "type"> & { email?: string };

export type UserSimple = UserBase & {
  type: "name";
};

export type UserKYC = UserBase & {
  type: "kyc";
  kycId: string;
};

export type User = UserEmail | UserKYC | UserSimple;
