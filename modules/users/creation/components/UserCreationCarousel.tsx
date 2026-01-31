import { StyleSheet } from "react-native";
import { CarouselApp } from "@/components/CarouselApp";
import OnBoardingStep from "@/modules/onBoarding/components/OnBoardingStep";
import { USER_CREATION_STEPS } from "../constants/UserCreationSteps";

export default function UserCreationCarousel() {
  const functionalityCarousel = USER_CREATION_STEPS.map((step) => {
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

  return <CarouselApp items={functionalityCarousel} />;
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
