import { router, Stack } from "expo-router";
import "react-native-reanimated";
import { useAppReady } from "@/hooks/useAppReady";
import { useEffect } from "react";

export default function RootLayout() {
  const { isAppReady, isAuthenticated } = useAppReady();

  useEffect(() => {
    if (isAppReady && isAuthenticated) {
      router.replace("/(tabs)/exploreRooms/byCode");
    }
  }, [isAppReady, isAuthenticated]);

  if (!isAppReady || isAuthenticated) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(unsigned)/login" options={{ headerShown: false }} />
      <Stack.Screen
        name="(unsigned)/(passwordRecovery)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(unsigned)/(registration)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
