import { Stack } from "expo-router";

export default function NewVotingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="boolean/index" />
      <Stack.Screen name="options/index" />
    </Stack>
  );
}
