import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { useOnboarding } from "@/hooks/useOnboarding";
import { ScrollView, StyleSheet } from "react-native";
import { CarouselApp } from "@/components/CarouselApp";
import OnBoardingStep from "@/modules/onBoarding/components/OnBoardingStep";
import { ONBOARDING_STEPS } from "@/modules/onBoarding/constants/OnBoardingSteps";
import { useAppReady } from "@/hooks/useAppReady";
import { router } from "expo-router";

export default function OnBoardingView() {
  const { completeOnboarding } = useOnboarding();
  const { isAuthenticated } = useAppReady();

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    if (isAuthenticated) {
      router.replace("/(tabs)/exploreRooms/byCode");
    } else {
      router.replace("/(unsigned)/login");
    }
  };

  const functionalityCarousel = ONBOARDING_STEPS.map((step) => {
    return {
      id: step.id,
      content: (
        <OnBoardingStep
          title={`${step.titleEmoji} ${step.title}`}
          descriptions={step.descriptions}
        />
      ),
    };
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
      >
        <ThemedText type="title" style={styles.mainTitle}>
          ¡Bienvenido a Vote Room!
        </ThemedText>

        <CarouselApp items={functionalityCarousel} />

        <ButtonApp
          label="Saltear Introducción"
          onPress={handleCompleteOnboarding}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  mainTitle: {
    textAlign: "center",
  },
});
