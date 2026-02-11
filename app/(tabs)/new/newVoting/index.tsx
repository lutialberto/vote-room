import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import BaseVotingForm from "@/modules/voting/components/BaseVotingForm";
import { BaseVotingForCreation } from "@/modules/voting/models/Voting";
import { useBaseVoting } from "@/modules/voting/hooks/useBaseVoting";
import { useEffect } from "react";

export default function NewVoting() {
  const { saveBaseVotingData, resetBaseVotingData } = useBaseVoting();

  useEffect(() => {
    resetBaseVotingData();
  }, []);

  const onCreateVoting = async (data: BaseVotingForCreation) => {
    saveBaseVotingData(data);
    switch (data.type) {
      case "boolean":
        router.replace("/(tabs)/new/newVoting/boolean");
        break;
      case "options":
        router.replace("/(tabs)/new/newVoting/options");
        break;
    }
  };

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", padding: 16, gap: 20 }}>
      <View>
        <ThemedText type="title">Crear Votación</ThemedText>
      </View>

      <BaseVotingForm
        onSubmit={onCreateVoting}
        isReadOnly={false}
        voting={null}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
