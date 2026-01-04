import { Stack } from "expo-router";

export default function NewVotingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="boolean/index" />
      <Stack.Screen name="options/index" />
      <Stack.Screen
        name="[id]/copy"
        options={{
          headerShown: true,
          title: "Copiar votación",
          headerBackTitle: "Volver",
        }}
      />
    </Stack>
  );
}
