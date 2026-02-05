import { useLocalSearchParams } from "expo-router";
import BooleanVotingView from "@/modules/voting/types/boolean/components/BooleanVotingView";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { BaseVoting } from "@/modules/voting/models/Voting";
import { fetchBaseVotingById } from "@/modules/voting/services/voting/votingService";
import { ThemedText } from "@/components/ThemedText";
import OptionsVotingView from "@/modules/voting/types/options/components/OptionsVotingView";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function VotingPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuthenticatedUser();
  const { data, error, isLoading } = useItemFetcherApp<BaseVoting>(
    () => fetchBaseVotingById(Number(id)),
    [id]
  );

  if (isLoading) {
    return <ThemedText>Cargando votación...</ThemedText>;
  }

  if (error || !data) {
    return <ThemedText>Error al cargar la votación.</ThemedText>;
  }

  switch (data.type) {
    case "boolean":
      return <BooleanVotingView id={Number(id)} user={currentUser} />;
    case "options":
      return <OptionsVotingView id={Number(id)} user={currentUser} />;
    default:
      return <ThemedText>Tipo de votación no soportado.</ThemedText>;
  }
}
