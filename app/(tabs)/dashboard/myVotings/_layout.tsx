import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

export default function MyVotingsScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[id]/index"
          options={{
            headerShown: true,
            title: "Votación",
            headerBackTitle: "Volver",
          }}
        />
        <Stack.Screen
          name="[id]/settings/index"
          options={{
            headerShown: true,
            title: "Ajustes de votación",
            headerBackTitle: "Volver",
          }}
        />
        <Stack.Screen
          name="[id]/settings/configuration"
          options={{
            headerShown: true,
            title: "Configuración de votación",
            headerBackTitle: "Volver",
          }}
        />
        <Stack.Screen
          name="[id]/settings/inviteUsers"
          options={{
            headerShown: true,
            title: "Invitar usuarios",
            headerBackTitle: "Volver",
          }}
        />
        <Stack.Screen
          name="[id]/settings/options"
          options={{
            headerShown: true,
            title: "Opciones de votación",
            headerBackTitle: "Volver",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
