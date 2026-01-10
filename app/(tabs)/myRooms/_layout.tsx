import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

export default function MyRoomsScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[roomId]/inviteUsers/index"
          options={{
            headerShown: true,
            title: "Invitar usuarios",
            headerBackTitle: "Volver",
          }}
        />
        <Stack.Screen
          name="[roomId]/shareRoom/index"
          options={{
            headerShown: true,
            title: "Compartir sala",
            headerBackTitle: "Volver",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
