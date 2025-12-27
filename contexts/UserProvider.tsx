import React, { createContext, useContext, ReactNode } from "react";
import { User } from "@/models/User";

export interface UserContextType {
  currentUser: User;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextType>(null);

const MOCK_CURRENT_USER: User = {
  id: 1,
  name: "Mock User",
  userName: "mockuser",
  email: "mockuser@example.com",
};

const contextValue: UserContextType = {
  currentUser: MOCK_CURRENT_USER,
  isAuthenticated: true,
};

export function UserProvider(props: { children: ReactNode }) {
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
