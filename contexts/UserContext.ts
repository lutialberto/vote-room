import React, { useContext } from "react";
import { UserContextType, UserContext } from "./UserProvider";

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
