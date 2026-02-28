import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { AwardDetail } from "@/modules/awards/models/award";
import { fetchAwardDetailById } from "@/modules/awards/services/award/awardService";
import { useLocalSearchParams } from "expo-router";

export default function AwardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuthenticatedUser();
  const { data, error, isLoading } = useItemFetcherApp<AwardDetail>(
    () => fetchAwardDetailById(Number(id)),
    [id]
  );

  if (isLoading) {
    return <SpinnerApp visible />;
  }

  if (error) {
    return (
      <ThemedView>
        <ThemedText>Error loading award details: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  const isOwner = currentUser.id === data?.owner.id;

  return (
    <ThemedView>
      <ThemedText>{data?.id}</ThemedText>
      <ThemedText>{data?.name}</ThemedText>
      <ThemedText>{data?.description}</ThemedText>
      <ThemedText>{data?.tags}</ThemedText>
      <ThemedText>{data?.releaseDate.toDateString()}</ThemedText>
      <ThemedText>{data?.awardDate.toDateString()}</ThemedText>
      <ThemedText>{data?.votingStage.startDate.toDateString()}</ThemedText>
      <ThemedText>{data?.votingStage.endDate.toDateString()}</ThemedText>
      {data?.triads.map((triad) => (
        <ThemedView key={triad.id}>
          <ThemedText>{triad.id}</ThemedText>
          <ThemedText>{triad.name}</ThemedText>
          {triad.nominees.map((item) => (
            <ThemedView key={item.id}>
              <ThemedText>{item.id}</ThemedText>
              <ThemedText>{item.name}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      ))}
    </ThemedView>
  );
}
