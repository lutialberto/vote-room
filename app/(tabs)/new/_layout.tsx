import { Stack } from "expo-router";

export default function NewLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="newRoom" options={{ headerShown: false }} />
      <Stack.Screen name="newVoting" options={{ headerShown: false }} />
    </Stack>
  );
}
