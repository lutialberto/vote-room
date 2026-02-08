import { Stack } from "expo-router";
import "react-native-reanimated";

export default function UserCreationLayout() {
  return (
    <Stack>
      <Stack.Screen name="email" options={{ headerShown: false }} />
      <Stack.Screen name="emailValidation" options={{ headerShown: false }} />
      <Stack.Screen name="changePassword" options={{ headerShown: false }} />
    </Stack>
  );
}
