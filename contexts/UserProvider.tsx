import { createContext, ReactNode, useState } from "react";
import { User } from "@/models/User";
import { USER_MOCK_RESPONSE } from "@/services/user/userServiceResponse";

export interface UserContextType {
  currentUser: User;
  isAuthenticated: boolean;
  switchUser: (user: User) => void;
}

const defaultContextValue: UserContextType = {
  currentUser: USER_MOCK_RESPONSE[0],
  isAuthenticated: true,
  switchUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export function UserProvider(props: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(USER_MOCK_RESPONSE[0]);

  const switchUser = (user: User) => {
    setCurrentUser(user);
  };

  const contextValue: UserContextType = {
    currentUser,
    isAuthenticated: true,
    switchUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
