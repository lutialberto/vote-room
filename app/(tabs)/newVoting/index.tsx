import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/contexts/UserContext";
import QuickBooleanPoll, {
  QuickBooleanPollForCreation,
} from "@/modules/voting/new/models/QuickBooleanPoll";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { router } from "expo-router";
import { createQuickBooleanPoll } from "@/modules/voting/services/voting/votingService";
import QuickBooleanPollForm from "@/modules/voting/components/QuickBooleanPollForm";
import { SpinnerApp } from "@/components/SpinnerApp";

export default function NewVoting() {
  const { currentUser } = useUser();

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

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", padding: 16, gap: 20 }}>
      <View>
        <ThemedText type="title">Crear Votación Rápida</ThemedText>
        <ThemedText type="subtitle">
          Crea una votación Sí/No en segundos
        </ThemedText>
      </View>

      <SpinnerApp visible={isWaitingCreate}>
        <QuickBooleanPollForm
          onSubmit={onCreatePoll}
          isReadOnly={false}
          voting={null}
        />
      </SpinnerApp>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
