import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { router } from "expo-router";
import { SpinnerApp } from "@/components/SpinnerApp";
import { BaseVotingForCreation } from "@/modules/voting/models/Voting";
import OptionsVotingForm from "@/modules/voting/types/options/components/OptionsVotingForm";
import OptionsVoting, {
  OptionsVotingForCreation,
} from "@/modules/voting/types/options/models/OptionsVoting";
import { createOptionsVoting } from "@/modules/voting/types/options/services/voting/optionsVotingService";
import { useBaseVoting } from "@/modules/voting/hooks/useBaseVoting";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function NewVoting() {
  const { currentUser } = useAuthenticatedUser();
  const { data: baseData } = useBaseVoting();

  const { isWaiting: isWaitingCreate, execPromise: handleCreate } =
    useWaitingApp<
      {
        userId: number;
        baseData: BaseVotingForCreation;
        options: string[];
      },
      OptionsVoting
    >({
      functionToWait: ({ userId, baseData, options }) =>
        createOptionsVoting({ userId, baseData, options }),
      success: ({ baseVotingId }) => {
        router.replace(`/(tabs)/dashboard/myVotings/${baseVotingId}`);
      },
    });

  const onCreateVoting = async (data: OptionsVotingForCreation) => {
    handleCreate({
      userId: currentUser.id,
      baseData: baseData!,
      options: data.options,
    });
  };

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", padding: 16, gap: 20 }}>
      <View>
        <ThemedText type="title">Crear Votación Rápida</ThemedText>
        <ThemedText type="subtitle">
          Crea una votación con opciones en segundos
        </ThemedText>
      </View>

      <SpinnerApp visible={isWaitingCreate}>
        <OptionsVotingForm
          onSubmit={onCreateVoting}
          isReadOnly={false}
          choices={null}
        />
      </SpinnerApp>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
