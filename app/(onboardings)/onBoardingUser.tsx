import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { StyleSheet } from "react-native";
import UserCreationCarousel from "@/modules/users/creation/components/UserCreationCarousel";
import { useUserSession } from "@/hooks/useUserSession";
import { useAppReady } from "@/hooks/useAppReady";
import { router } from "expo-router";

export default function UserCreationOnBoardingView() {
  const { completeUserCreation } = useUserSession();
  const { isAuthenticated } = useAppReady();

  const handleCompleteOnboarding = () => {
    completeUserCreation();
    if (isAuthenticated) {
      router.replace("/(tabs)/exploreRooms/byCode");
    } else {
      router.replace("/(unsigned)/login");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <UserCreationCarousel />

      <ButtonApp
        label="Saltear introducción"
        onPress={handleCompleteOnboarding}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    gap: 20,
  },
  mainTitle: {
    textAlign: "center",
  },
});
