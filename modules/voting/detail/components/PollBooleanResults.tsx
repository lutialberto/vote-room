import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function PollBooleanResults({
  yesVotes,
  noVotes,
  error,
}: {
  yesVotes: number;
  noVotes: number;
  error: Error | null;
}) {
  const colors = useThemeColor();
  if (error) {
    return <ThemedText>Error cargando resultados.</ThemedText>;
  }
  return (
    <ThemedView style={{ gap: 16, width: "100%" }}>
      <ThemedView
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <ThemedText>NO: {noVotes}</ThemedText>
        <ThemedText>Total: {yesVotes + noVotes}</ThemedText>
        <ThemedText>SI: {yesVotes}</ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          flexDirection: "row",
          width: "100%",
          height: 50,
          backgroundColor: colors.border,
        }}
      >
        <ThemedView
          style={{
            flex: noVotes,
            backgroundColor: colors.cancel,
          }}
        ></ThemedView>
        <ThemedView
          style={{
            flex: yesVotes,
            backgroundColor: colors.primary,
          }}
        ></ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
