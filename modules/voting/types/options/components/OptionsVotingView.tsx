import { ButtonApp } from "@/components/ButtonApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import CountDownApp from "@/components/CountDownApp";
import BaseVotingStatus from "@/modules/voting/components/BaseVotingStatus";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import OptionsVoting from "../models/OptionsVoting";
import { fetchOptionsVotingById } from "../services/voting/optionsVotingService";
import { OptionsVote } from "../models/OptionsVote";
import {
  castOptionsVote,
  fetchOptionsVotesByVotingId,
} from "../services/vote/optionsVoteService";
import OptionsVotingOptions from "./OptionsVotingOptions";
import OptionsVotingResults from "./OptionsVotingResults";
import { CardApp } from "@/components/CardApp";
import { User } from "@/models/User";

export default function OptionsVotingView(props: { id: number; user: User }) {
  const {
    data,
    error,
    isLoading,
    refetch: refetchVoting,
  } = useItemFetcherApp<OptionsVoting>(() => fetchOptionsVotingById(props.id));
  const { execPromise: handleVote, isWaiting: isWaitingVote } = useWaitingApp<
    {
      optionId: number;
    },
    OptionsVote
  >({
    functionToWait: ({ optionId }) =>
      castOptionsVote({
        votingId: props.id,
        optionId,
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
  } = useListFetcherApp<OptionsVote>(() =>
    fetchOptionsVotesByVotingId(props.id)
  );
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
    <ThemedView
      style={{ flex: 1, alignItems: "center", paddingHorizontal: 10 }}
    >
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
        <CardApp style={{ padding: 16, width: "100%" }}>
          {alreadyVoted && (
            <ThemedText type="hint">
              ✅ Ya has votado en esta encuesta
            </ThemedText>
          )}
          {!alreadyVoted && data?.baseVoting.status === "active" ? (
            <SpinnerApp visible={isWaitingVote}>
              <OptionsVotingOptions
                options={data?.options}
                handleOptionSelected={(optionId) => handleVote({ optionId })}
              />
            </SpinnerApp>
          ) : (
            <SpinnerApp visible={isLoadingVotes}>
              <OptionsVotingResults
                options={data?.options}
                votes={votes}
                error={errorVotes}
              />
            </SpinnerApp>
          )}
        </CardApp>
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
