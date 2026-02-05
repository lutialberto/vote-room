import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { useOnboarding } from "@/hooks/useOnboarding";
import { ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { CarouselApp } from "@/components/CarouselApp";
import OnBoardingStep from "@/modules/onBoarding/components/OnBoardingStep";
import { ONBOARDING_STEPS } from "@/modules/onBoarding/constants/OnBoardingSteps";

export default function OnBoardingView() {
  const { completeOnboarding } = useOnboarding();

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    router.replace("/userCreation/onBoarding");
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
