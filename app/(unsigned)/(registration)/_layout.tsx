import { Stack } from "expo-router";
import "react-native-reanimated";

export default function UserCreationLayout() {
  return (
    <Stack>
      <Stack.Screen name="new" options={{ headerShown: false }} />
      <Stack.Screen
        name="/emailCodeValidation"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
