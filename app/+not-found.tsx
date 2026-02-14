import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppReady } from "@/hooks/useAppReady";

export default function NotFoundScreen() {
  const { isAuthenticated, isAppReady } = useAppReady();

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        {isAuthenticated ? (
          <Link href="/(tabs)/dashboard" style={styles.link}>
            <ThemedText type="link">Go to home screen!</ThemedText>
          </Link>
        ) : (
          <Link href="/(unsigned)/login" style={styles.link}>
            <ThemedText type="link">Go to login screen!</ThemedText>
          </Link>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
