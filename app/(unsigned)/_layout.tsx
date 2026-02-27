import { router, Stack } from "expo-router";
import "react-native-reanimated";
import { useAppReady } from "@/hooks/useAppReady";
import { useEffect } from "react";

export default function RootLayout() {
  const { isAppReady, isAuthenticated } = useAppReady();

  useEffect(() => {
    if (isAppReady && isAuthenticated) {
      router.replace("/explore/byCode");
    }
  }, [isAppReady, isAuthenticated]);

  if (!isAppReady || isAuthenticated) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="(passwordRecovery)"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(registration)" options={{ headerShown: false }} />
    </Stack>
  );
}
