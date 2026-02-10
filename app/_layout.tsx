import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppReady } from "@/hooks/useAppReady";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const {
    isAppReady,
    shouldShowOnboarding,
    shouldShowUserCreation,
    isAuthenticated,
  } = useAppReady();

  useEffect(() => {
    if (isAppReady) {
      //se agrega delay para que no haya un parpadeo al ocultar el splash screen e instanciar el stack
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 300);
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Protected guard={shouldShowOnboarding}>
            <Stack.Screen
              name="(onBoardings)/onboardingWelcome"
              options={{ headerShown: false }}
            />
          </Stack.Protected>
          <Stack.Protected guard={shouldShowUserCreation}>
            <Stack.Screen
              name="(onBoardings)/onBoardingUser"
              options={{ headerShown: false }}
            />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(unsigned)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaView>
  );
}
