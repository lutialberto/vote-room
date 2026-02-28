import { View, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import {
  fetchBaseVotingById,
  updateBaseVoting,
} from "@/modules/voting/services/voting/votingService";
import { useLocalSearchParams, router } from "expo-router";
import { SpinnerApp } from "@/components/SpinnerApp";
import BaseVotingForm from "@/modules/voting/components/baseVotingForm/BaseVotingForm";
import {
  BaseVoting,
  BaseVotingAdvancedForCreation,
  BaseVotingForCreation,
} from "@/modules/voting/models/Voting";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useEffect } from "react";

export default function VotingEditPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuthenticatedUser();

  const {
    data: voting,
    error,
    isLoading,
  } = useItemFetcherApp(() => fetchBaseVotingById(Number(id)), [id]);

  const { isWaiting: isUpdating, execPromise: handleUpdate } = useWaitingApp<
    {
      data: BaseVotingForCreation;
      advancedData: BaseVotingAdvancedForCreation;
    },
    BaseVoting
  >({
    functionToWait: async ({ data, advancedData }) =>
      updateBaseVoting({
        data,
        advancedData,
        id: voting?.id!,
        userId: currentUser.id,
      }),
    success: () => router.navigate(`/dashboard/myVotings/${id}`),
    failure: () =>
      Alert.alert(
        "Error",
        "No se pudo actualizar la votación. Por favor, inténtalo de nuevo."
      ),
  });

  useEffect(() => {
    if (voting && voting.owner.id !== currentUser.id) {
      router.back();
    }
  }, [voting, currentUser.id]);

  const canEdit = voting?.status === "draft" || voting?.status === "scheduled";
  const isReadOnly = !canEdit;

  if (error) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText>Error cargando la votación</ThemedText>
        <ButtonApp label="Volver" onPress={() => router.back()} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, padding: 16, gap: 20 }}>
      <SpinnerApp visible={isLoading || isUpdating}>
        <ThemedText type="title">
          {isReadOnly ? "Ver votación" : "Editar votación"}
        </ThemedText>

        <BaseVotingForm
          onSubmit={handleUpdate}
          voting={voting || null}
          isReadOnly={isReadOnly || isUpdating}
        />
      </SpinnerApp>
    </ThemedView>
  );
}
