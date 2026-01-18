import { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "@/utils/storage.utils";

const ONBOARDING_KEY = "hasCompletedOnboarding";

export function useOnboarding() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    setIsLoading(true);
    const value = await getFromStorage({ key: ONBOARDING_KEY });
    const hasCompleted = value === "true";
    setShouldShowOnboarding(!hasCompleted);
    setIsLoading(false);
  };

  const completeOnboarding = async () => {
    const value = await getFromStorage({ key: ONBOARDING_KEY });
    if (value === "true") return;
    saveToStorage({ key: ONBOARDING_KEY }, "true");
    setShouldShowOnboarding(false);
  };

  const resetOnboarding = () => {
    saveToStorage({ key: ONBOARDING_KEY }, "false");
    setShouldShowOnboarding(true);
  };

  return {
    isLoading,
    shouldShowOnboarding,
    completeOnboarding,
    resetOnboarding,
  };
}
