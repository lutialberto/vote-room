import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/contexts/UserContext";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import QuickBooleanPollForm from "@/modules/voting/components/QuickBooleanPollForm";
import QuickBooleanPoll, {
  QuickBooleanPollForCreation,
} from "@/modules/voting/new/models/QuickBooleanPoll";
import {
  createQuickBooleanPoll,
  fetchQuickBooleanPollById,
} from "@/modules/voting/services/voting/votingService";
import { router, useLocalSearchParams } from "expo-router";

export default function CopyVoting() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useUser();

  const { data, error, isLoading } = useItemFetcherApp<QuickBooleanPoll>(
    () => fetchQuickBooleanPollById(Number(id)),
    [id]
  );

  const { isWaiting: isWaitingCreate, execPromise: handleCreate } =
    useWaitingApp<
      {
        userId: number;
        pollData: QuickBooleanPollForCreation;
      },
      QuickBooleanPoll
    >({
      functionToWait: ({ userId, pollData }) =>
        createQuickBooleanPoll({ userId, pollData }),
      success: ({ id }) => {
        router.replace(`/voting/${id}`);
      },
    });

  const onCreatePoll = async (data: QuickBooleanPollForCreation) => {
    handleCreate({
      userId: currentUser.id,
      pollData: data,
    });
  };

  if (data && data.owner.id !== currentUser.id) {
    router.replace("/(tabs)/newVoting");
  }

  if (error) {
    return (
      <ThemedView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ThemedText type="title">Error al cargar la votación</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ThemedText type="title">Replicar Votación</ThemedText>
      <SpinnerApp visible={isLoading}>
        <QuickBooleanPollForm
          onSubmit={onCreatePoll}
          isReadOnly={false}
          voting={data || null}
        />
      </SpinnerApp>
    </ThemedView>
  );
}
