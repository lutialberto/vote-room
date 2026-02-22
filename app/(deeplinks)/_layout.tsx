import { router, Stack, usePathname, Href } from "expo-router";
import "react-native-reanimated";
import { useAppReady } from "@/hooks/useAppReady";
import { useDeeplinkHolderApp } from "@/hooks/useDeeplinkHolderApp";
import { useEffect } from "react";

export default function DeeplinksLayout() {
  const {
    isAppReady,
    shouldShowOnboarding,
    shouldShowUserCreation,
    isAuthenticated,
  } = useAppReady();
  const { saveDeeplink } = useDeeplinkHolderApp();
  const deeplink = usePathname() as Href;

  useEffect(() => {
    if (!isAppReady) return;

    if (shouldShowOnboarding) {
      saveDeeplink(deeplink);
      router.navigate("/(onboardings)/onBoardingWelcome");
    } else if (shouldShowUserCreation) {
      saveDeeplink(deeplink);
      router.navigate("/(onboardings)/onBoardingUser");
    } else if (!isAuthenticated) {
      saveDeeplink(deeplink);
      router.navigate("/(unsigned)/login");
    }
  }, [
    isAppReady,
    shouldShowOnboarding,
    shouldShowUserCreation,
    isAuthenticated,
  ]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="room/[roomId]/invitation"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
