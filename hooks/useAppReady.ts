import { useUser } from "@/hooks/useUser";
import { useOnboarding } from "./useOnboarding";
import { useUserSession } from "./useUserSession";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useDeeplinkHolderApp } from "./useDeeplinkHolderApp";

export function useAppReady() {
  const { isAuthenticated, isReady: isUserReady, loadInitialUser } = useUser();
  const { isLoading: onboardingLoading, shouldShowOnboarding } =
    useOnboarding();
  const { isLoading: userSessionLoading, shouldShowUserCreation } =
    useUserSession();
  const [areFontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isLoading: deeplinkLoading } = useDeeplinkHolderApp();
  const isAppReady =
    areFontsLoaded &&
    !onboardingLoading &&
    !userSessionLoading &&
    !deeplinkLoading &&
    isUserReady;

  useEffect(() => {
    loadInitialUser();
  }, []);

  return {
    isAppReady,
    shouldShowOnboarding,
    shouldShowUserCreation,
    isAuthenticated,
  };
}
