import { ButtonApp } from "@/components/ButtonApp";
import { ThemedView } from "@/components/ThemedView";

export default function BooleanVotingOptions({
  handleYes,
  handleNo,
}: {
  handleYes: () => void;
  handleNo: () => void;
}) {
  return (
    <ThemedView style={{ flexDirection: "row", gap: 16 }}>
      <ButtonApp
        label="NO"
        type="cancel"
        onPress={handleNo}
        style={{ flex: 1 }}
      />
      <ButtonApp label="SI" onPress={handleYes} style={{ flex: 1 }} />
    </ThemedView>
  );
}
