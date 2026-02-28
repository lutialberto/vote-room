import { Stack } from "expo-router";

export default function NewAwardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Nueva premiación",
        }}
      />
      <Stack.Screen
        name="triadCreation"
        options={{
          headerShown: true,
          headerTitle: "Creación de ternas",
        }}
      />
    </Stack>
  );
}
