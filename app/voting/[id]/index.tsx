import { ButtonApp } from "@/components/ButtonApp";
import CountDownApp from "@/components/CountDownApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/contexts/UserContext";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import PollBooleanOptions from "@/modules/voting/detail/components/PollBooleanOptions";
import PollBooleanResults from "@/modules/voting/detail/components/PollBooleanResults";
import { Vote } from "@/modules/voting/models/Voting";
import QuickBooleanPoll from "@/modules/voting/new/models/QuickBooleanPoll";
import {
  castVote,
  fetchVotesByVotingId,
} from "@/modules/voting/services/vote/voteService";
import { fetchQuickBooleanPollById } from "@/modules/voting/services/voting/votingService";
import { useLocalSearchParams } from "expo-router";

export default function VotingPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useUser();
  const {
    data,
    error,
    isLoading,
    refetch: refetchVoting,
  } = useItemFetcherApp<QuickBooleanPoll>(
    () => fetchQuickBooleanPollById(Number(id)),
    [id]
  );
  const { execPromise: handleVote, isWaiting: isWaitingVote } = useWaitingApp<
    {
      choice: boolean;
    },
    Vote
  >({
    functionToWait: ({ choice }) =>
      castVote({
        votingId: Number(id),
        choice,
        userId: user.currentUser.id,
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
  } = useListFetcherApp<Vote>(() => fetchVotesByVotingId(Number(id)), [id]);
  const noVotes = votes.filter((vote) => !vote.choice).length;
  const yesVotes = votes.filter((vote) => vote.choice).length;
  const alreadyVoted = votes.some(
    (vote) => vote.userId === user.currentUser.id
  );

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
        <ThemedText type="title">{data?.question}</ThemedText>
        {data?.description && (
          <ThemedText type="subtitle">{data?.description}</ThemedText>
        )}
        {data?.close.type === "programmedClose" && data.status === "active" && (
          <CountDownApp
            seconds={(data.close.durationMinutes || 0) * 60}
            onFinish={refetchVoting}
          />
        )}
        {data?.status === "closed" && (
          <ThemedText>Esta votación ha finalizado</ThemedText>
        )}
        {data?.status === "scheduled" && (
          <ThemedText>Esta votación aún no ha comenzado</ThemedText>
        )}
        <SpinnerApp visible={isLoadingVotes}>
          <PollBooleanResults
            yesVotes={yesVotes}
            noVotes={noVotes}
            error={errorVotes}
          />
        </SpinnerApp>
        {alreadyVoted ? (
          <ThemedText type="hint">✅ Ya has votado en esta encuesta</ThemedText>
        ) : (
          <SpinnerApp visible={isWaitingVote}>
            <PollBooleanOptions
              handleYes={() => handleVote({ choice: true })}
              handleNo={() => handleVote({ choice: false })}
            />
          </SpinnerApp>
        )}
      </SpinnerApp>
      <ButtonApp
        label="Actualizar resultados"
        onPress={() => {
          refetchVoting();
          refetchVotes();
        }}
      />
    </ThemedView>
  );
}
