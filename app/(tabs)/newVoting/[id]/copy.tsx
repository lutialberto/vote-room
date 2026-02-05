import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import BaseVotingForm from "@/modules/voting/components/BaseVotingForm";
import { router, useLocalSearchParams } from "expo-router";
import { BaseVotingForCreation } from "@/modules/voting/models/Voting";
import {
  createBooleanVoting,
  fetchBooleanVotingById,
} from "@/modules/voting/types/boolean/services/voting/booleanVotingService";
import BooleanVoting from "@/modules/voting/types/boolean/models/BooleanVoting";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function CopyVoting() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuthenticatedUser();

  const { data, error, isLoading } = useItemFetcherApp<BooleanVoting>(
    () => fetchBooleanVotingById(Number(id)),
    [id]
  );

  const { isWaiting: isWaitingCreate, execPromise: handleCreate } =
    useWaitingApp<
      {
        userId: number;
        data: BaseVotingForCreation;
      },
      BooleanVoting
    >({
      functionToWait: ({ userId, data }) =>
        createBooleanVoting({ userId, data }),
      success: ({ baseVotingId }) => {
        router.replace(`/(tabs)/myVotings/${baseVotingId}`);
      },
    });

  const onCreateVoting = async (data: BaseVotingForCreation) => {
    handleCreate({
      userId: currentUser.id,
      data: data,
    });
  };

  if (data && data.baseVoting.owner.id !== currentUser.id) {
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
        <BaseVotingForm
          onSubmit={onCreateVoting}
          isReadOnly={false}
          voting={data?.baseVoting || null}
          isEditMode={false}
        />
      </SpinnerApp>
    </ThemedView>
  );
}
