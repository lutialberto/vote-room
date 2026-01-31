import { Stack } from "expo-router";
import "react-native-reanimated";

export default function UserCreationLayout() {
  return (
    <Stack>
      <Stack.Screen name="onBoarding" options={{ headerShown: false }} />
      <Stack.Screen name="new" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="(emailRegistration)/emailCodeValidation"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
