import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Explorar",
        }}
      />
      <Stack.Screen
        name="rooms/public"
        options={{
          headerShown: true,
          headerTitle: "Salas Públicas",
        }}
      />
      <Stack.Screen
        name="rooms/byCode"
        options={{
          headerShown: true,
          headerTitle: "Buscar por Código",
        }}
      />
      <Stack.Screen
        name="rooms/invitations"
        options={{
          headerShown: true,
          headerTitle: "Invitaciones Pendientes",
        }}
      />
      <Stack.Screen
        name="votings/public"
        options={{
          headerShown: true,
          headerTitle: "Votaciones Públicas",
        }}
      />
      <Stack.Screen
        name="votings/byCode"
        options={{
          headerShown: true,
          headerTitle: "Buscar por Código",
        }}
      />
      <Stack.Screen
        name="votings/invitations"
        options={{
          headerShown: true,
          headerTitle: "Invitaciones Pendientes",
        }}
      />
    </Stack>
  );
}
