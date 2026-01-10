import { createContext, ReactNode } from "react";
import { User } from "@/models/User";
import { USER_MOCK_RESPONSE } from "@/services/user/userServiceResponse";

export interface UserContextType {
  currentUser: User;
  isAuthenticated: boolean;
}

const contextValue: UserContextType = {
  currentUser: USER_MOCK_RESPONSE[0],
  isAuthenticated: true,
};

export const UserContext = createContext<UserContextType>(contextValue);

export function UserProvider(props: { children: ReactNode }) {
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
