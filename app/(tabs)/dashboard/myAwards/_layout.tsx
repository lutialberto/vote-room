import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

export default function MyAwardsScreen() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: true,
          title: "Detalles de la premiación",
        }}
      />
      <Stack.Screen
        name="[id]/settings/index"
        options={{
          headerShown: true,
          title: "Configuración",
        }}
      />
      <Stack.Screen
        name="[id]/settings/invitations"
        options={{
          headerShown: true,
          title: "Invitar usuarios",
        }}
      />
    </Stack>
  );
}
