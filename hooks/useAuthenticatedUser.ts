import { useUser } from "./useUser";

export function useAuthenticatedUser() {
  const { currentUser, isAuthenticated, switchUser, logout } = useUser();

  if (!isAuthenticated || !currentUser) {
    throw new Error(
      "useAuthenticatedUser can only be used when user is authenticated"
    );
  }

  return {
    currentUser,
    switchUser,
    logout,
  };
}
