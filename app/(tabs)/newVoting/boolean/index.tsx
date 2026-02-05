import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { router } from "expo-router";
import { SpinnerApp } from "@/components/SpinnerApp";
import { BaseVotingForCreation } from "@/modules/voting/models/Voting";
import { createBooleanVoting } from "@/modules/voting/types/boolean/services/voting/booleanVotingService";
import BooleanVoting from "@/modules/voting/types/boolean/models/BooleanVoting";
import { useBaseVoting } from "@/modules/voting/hooks/useBaseVoting";
import { useEffect } from "react";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function NewBaseVoting() {
  const { currentUser } = useAuthenticatedUser();
  const { data } = useBaseVoting();

  useEffect(() => {
    if (data) {
      handleCreate({
        userId: currentUser.id,
        data,
      });
    }
  }, [currentUser, data]);

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

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", padding: 16, gap: 20 }}>
      <View>
        <ThemedText type="title">Crear Votación Sí/No</ThemedText>
      </View>

      <SpinnerApp visible={isWaitingCreate}></SpinnerApp>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
