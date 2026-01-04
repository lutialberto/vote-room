import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/contexts/UserContext";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { router, useLocalSearchParams } from "expo-router";
import { SpinnerApp } from "@/components/SpinnerApp";
import OptionsVotingForm from "@/modules/voting/types/options/components/OptionsVotingForm";
import OptionsVoting, {
  OptionsVotingForCreation,
} from "@/modules/voting/types/options/models/OptionsVoting";
import {
  fetchOptionsVotingByVotingId,
  updateOptionsVoting,
} from "@/modules/voting/types/options/services/voting/optionsVotingService";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";

export default function EditVotingOptions() {
  const { currentUser } = useUser();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, error, isLoading } = useItemFetcherApp(
    () => fetchOptionsVotingByVotingId(Number(id)),
    [id]
  );

  const { isWaiting: isWaitingCreate, execPromise: handleUpdate } =
    useWaitingApp<
      {
        userId: number;
        votingId: number;
        options: string[];
      },
      OptionsVoting
    >({
      functionToWait: ({ userId, votingId, options }) =>
        updateOptionsVoting({ userId, votingId, options }),
      success: ({ baseVotingId }) => {
        router.replace(`/voting/${baseVotingId}`);
      },
    });

  const onUpdateVotingOptions = async (data: OptionsVotingForCreation) => {
    handleUpdate({
      userId: currentUser.id,
      votingId: Number(id),
      options: data.options,
    });
  };

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", padding: 16, gap: 20 }}>
      <View>
        <ThemedText type="title">Votación con opciones</ThemedText>
      </View>

      <SpinnerApp visible={isWaitingCreate || isLoading}>
        <OptionsVotingForm
          onSubmit={onUpdateVotingOptions}
          isReadOnly={data?.baseVoting.status !== "draft"}
          choices={data?.options.map((option) => option.label) ?? []}
        />
      </SpinnerApp>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
