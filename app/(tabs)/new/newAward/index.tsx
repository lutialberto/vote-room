import { ThemedView } from "@/components/ThemedView";
import AwardBaseDataForm from "@/modules/awards/newSteps/components/AwardBaseDataForm";

export default function NewAwardsScreen() {
  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 10 }}>
      <AwardBaseDataForm />
    </ThemedView>
  );
}
