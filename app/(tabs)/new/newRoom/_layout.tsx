import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

export default function NewRoomScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="roomNameStep"
          options={{ title: "Crear Sala", headerShown: false }}
        />
        <Stack.Screen name="roomTypeStep" options={{ title: "Tipo de Sala" }} />
        <Stack.Screen
          name="roomScopeStep"
          options={{ title: "Sala pública o privada?" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
