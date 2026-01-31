import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import UserCreationCarousel from "@/modules/users/creation/components/UserCreationCarousel";
import { useUserSession } from "@/hooks/useUserSession";

export default function UserCreationOnBoardingView() {
  const { completeUserCreation } = useUserSession();

  const handleCompleteOnboarding = () => {
    completeUserCreation();
    router.replace("/userCreation/new");
  };

  return (
    <ThemedView style={styles.container}>
      <UserCreationCarousel />

      <ButtonApp
        label="Ir a Crear Usuario"
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
