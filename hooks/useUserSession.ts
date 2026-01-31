import { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "@/utils/storage.utils";

const USER_CREATION_KEY = "hasCompletedUserCreation";

export function useUserSession() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowUserCreation, setShouldShowUserCreation] = useState(false);

  useEffect(() => {
    checkUserCreationStatus();
  }, []);

  const checkUserCreationStatus = async () => {
    setIsLoading(true);
    const value = await getFromStorage({ key: USER_CREATION_KEY });
    const hasCompleted = value === "true";
    setShouldShowUserCreation(!hasCompleted);
    setIsLoading(false);
  };

  const completeUserCreation = async () => {
    const value = await getFromStorage({ key: USER_CREATION_KEY });
    if (value === "true") return;
    saveToStorage({ key: USER_CREATION_KEY }, "true");
    setShouldShowUserCreation(false);
  };

  const resetUserCreation = () => {
    saveToStorage({ key: USER_CREATION_KEY }, "false");
    setShouldShowUserCreation(true);
  };

  return {
    isLoading,
    shouldShowUserCreation,
    completeUserCreation,
    resetUserCreation,
  };
}
