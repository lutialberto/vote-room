import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/contexts/UserContext";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { router } from "expo-router";
import BaseVotingForm from "@/modules/voting/components/BaseVotingForm";
import { SpinnerApp } from "@/components/SpinnerApp";
import { BaseVotingForCreation } from "@/modules/voting/models/Voting";
import { createBooleanVoting } from "@/modules/voting/types/boolean/services/voting/booleanVotingService";
import BooleanVoting from "@/modules/voting/types/boolean/models/BooleanVoting";

export default function NewVoting() {
  const { currentUser } = useUser();

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
      success: ({ id }) => {
        router.replace(`/voting/${id}`);
      },
    });

  const onCreateVoting = async (data: BaseVotingForCreation) => {
    handleCreate({
      userId: currentUser.id,
      data: data,
    });
  };

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", padding: 16, gap: 20 }}>
      <View>
        <ThemedText type="title">Crear Votación Rápida</ThemedText>
        <ThemedText type="subtitle">
          Crea una votación Sí/No en segundos
        </ThemedText>
      </View>

      <SpinnerApp visible={isWaitingCreate}>
        <BaseVotingForm
          onSubmit={onCreateVoting}
          isReadOnly={false}
          voting={null}
        />
      </SpinnerApp>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
