import { ButtonApp } from "@/components/ButtonApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import BooleanVotingOptions from "./BooleanVotingOptions";
import { ThemedText } from "@/components/ThemedText";
import BooleanVotingResults from "./BooleanVotingResults";
import CountDownApp from "@/components/CountDownApp";
import BaseVotingStatus from "@/modules/voting/components/BaseVotingStatus";
import { BooleanVote } from "../models/BooleanVote";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import {
  castBooleanVote,
  fetchBooleanVotesByVotingId,
} from "../services/vote/booleanVoteService";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { fetchBooleanVotingById } from "../services/voting/booleanVotingService";
import BooleanVoting from "../models/BooleanVoting";
import { User } from "@/models/User";

export default function BooleanVotingView(props: { id: number; user: User }) {
  const {
    data,
    error,
    isLoading,
    refetch: refetchVoting,
  } = useItemFetcherApp<BooleanVoting>(() => fetchBooleanVotingById(props.id));
  const { execPromise: handleVote, isWaiting: isWaitingVote } = useWaitingApp<
    {
      choice: boolean;
    },
    BooleanVote
  >({
    functionToWait: ({ choice }) =>
      castBooleanVote({
        votingId: props.id,
        choice,
        userId: props.user.id,
      }),
    success: () => {
      refetchVoting();
      refetchVotes();
    },
  });
  const {
    data: votes,
    error: errorVotes,
    isLoading: isLoadingVotes,
    refetch: refetchVotes,
  } = useListFetcherApp<BooleanVote>(() =>
    fetchBooleanVotesByVotingId(props.id)
  );
  const noVotes = votes.filter((vote) => !vote.choice).length;
  const yesVotes = votes.filter((vote) => vote.choice).length;
  const alreadyVoted = votes.some((vote) => vote.userId === props.user.id);

  if (error) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText>Error cargando datos de votación.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, alignItems: "center" }}>
      <SpinnerApp visible={isLoading}>
        <ThemedText type="title">{data?.baseVoting.question}</ThemedText>
        {data?.baseVoting.description && (
          <ThemedText type="subtitle">
            {data?.baseVoting.description}
          </ThemedText>
        )}
        {data && (
          <BaseVotingStatus
            status={data.baseVoting.status}
            releaseDate={data?.baseVoting.release.date}
          />
        )}
        {data?.baseVoting.close.type === "programmedClose" &&
          data.baseVoting.status === "active" && (
            <CountDownApp
              seconds={(data.baseVoting.close.durationMinutes || 0) * 60}
              onFinish={refetchVoting}
            />
          )}
        {alreadyVoted && (
          <ThemedText type="hint">✅ Ya has votado en esta encuesta</ThemedText>
        )}
        {!alreadyVoted && data?.baseVoting.status === "active" ? (
          <SpinnerApp visible={isWaitingVote}>
            <BooleanVotingOptions
              handleYes={() => handleVote({ choice: true })}
              handleNo={() => handleVote({ choice: false })}
            />
          </SpinnerApp>
        ) : (
          <SpinnerApp visible={isLoadingVotes}>
            <BooleanVotingResults
              yesVotes={yesVotes}
              noVotes={noVotes}
              error={errorVotes}
            />
          </SpinnerApp>
        )}
      </SpinnerApp>
      <ThemedView style={{ gap: 8 }}>
        {data?.baseVoting.status !== "closed" && (
          <ButtonApp
            label="Actualizar resultados"
            onPress={() => {
              refetchVoting();
              refetchVotes();
            }}
          />
        )}
        {data?.baseVoting.owner.id === props.user.id && (
          <ButtonApp
            label="Configuración"
            onPress={() => router.push(`/(tabs)/myVotings/${data.id}/edit`)}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}
