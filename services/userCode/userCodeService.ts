import { userCodeServiceInstance } from "./userCodeServiceImpl";

export const createUserCode = async (
  email: string
): Promise<{ email: string }> => {
  return userCodeServiceInstance.createUserCode(email);
};

export const validateEmailCode = async (data: {
  email: string;
  code: string;
}): Promise<boolean> => {
  return userCodeServiceInstance.validateEmailCode(data);
};
