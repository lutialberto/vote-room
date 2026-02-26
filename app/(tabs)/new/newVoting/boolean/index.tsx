import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { router } from "expo-router";
import { SpinnerApp } from "@/components/SpinnerApp";
import {
  BaseVotingAdvancedForCreation,
  BaseVotingForCreation,
} from "@/modules/voting/models/Voting";
import { createBooleanVoting } from "@/modules/voting/types/boolean/services/voting/booleanVotingService";
import BooleanVoting from "@/modules/voting/types/boolean/models/BooleanVoting";
import { useBaseVoting } from "@/modules/voting/hooks/useBaseVoting";
import { useEffect } from "react";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function NewBaseVoting() {
  const { currentUser } = useAuthenticatedUser();
  const { data, advancedData } = useBaseVoting();

  useEffect(() => {
    if (data && advancedData) {
      handleCreate({
        userId: currentUser.id,
        data,
        advancedData,
      });
    }
  }, [currentUser, data, advancedData]);

  const { isWaiting: isWaitingCreate, execPromise: handleCreate } =
    useWaitingApp<
      {
        userId: number;
        data: BaseVotingForCreation;
        advancedData: BaseVotingAdvancedForCreation;
      },
      BooleanVoting
    >({
      functionToWait: ({ userId, data, advancedData }) =>
        createBooleanVoting({ userId, data, advancedData }),
      success: ({ baseVotingId }) => {
        router.replace(`/dashboard/myVotings/${baseVotingId}`);
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
