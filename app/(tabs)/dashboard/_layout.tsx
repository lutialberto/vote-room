import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="myRooms" options={{ headerShown: false }} />
      <Stack.Screen name="myVotings" options={{ headerShown: false }} />
    </Stack>
  );
}
