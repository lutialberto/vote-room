import { View, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { useUser } from "@/contexts/UserContext";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import {
  activateBaseVoting,
  closeBaseVoting,
  updateBaseVoting,
} from "@/modules/voting/services/voting/votingService";
import { useLocalSearchParams, router } from "expo-router";
import { SpinnerApp } from "@/components/SpinnerApp";
import BaseVotingForm from "@/modules/voting/components/BaseVotingForm";
import {
  BaseVoting,
  BaseVotingForCreation,
} from "@/modules/voting/models/Voting";
import { fetchBooleanVotingById } from "@/modules/voting/types/boolean/services/voting/booleanVotingService";

export default function VotingEditPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useUser();

  const {
    data: voting,
    error,
    isLoading,
  } = useItemFetcherApp(() => fetchBooleanVotingById(Number(id)), [id]);

  const { isWaiting: isUpdating, execPromise: handleUpdate } = useWaitingApp({
    functionToWait: async (data: BaseVotingForCreation) =>
      updateBaseVoting({
        data: data,
        id: voting?.baseVotingId!,
        userId: currentUser.id,
      }),
    success: () => router.navigate(`/voting/${id}`),
    failure: () =>
      Alert.alert(
        "Error",
        "No se pudo actualizar la votación. Por favor, inténtalo de nuevo."
      ),
  });

  const { isWaiting: isActivating, execPromise: handleActivate } =
    useWaitingApp<
      {
        id: number;
        userId: number;
      },
      BaseVoting
    >({
      functionToWait: async (props) => activateBaseVoting(props),
      success: () => router.replace(`/voting/${id}`),
      failure: () =>
        Alert.alert(
          "Error",
          "No se pudo activar la votación. Por favor, inténtalo de nuevo."
        ),
    });

  const { isWaiting: isClosing, execPromise: handleClose } = useWaitingApp<
    {
      id: number;
      userId: number;
    },
    BaseVoting
  >({
    functionToWait: async (props) => closeBaseVoting(props),
    success: () => {
      router.replace(`/voting/${id}`);
    },
    failure: () =>
      Alert.alert(
        "Error",
        "No se pudo cerrar la votación. Por favor, inténtalo de nuevo."
      ),
  });

  if (voting && voting.baseVoting.owner.id !== currentUser.id) {
    router.back();
  }

  const canEdit =
    voting?.baseVoting.status === "draft" ||
    voting?.baseVoting.status === "scheduled";
  const canActivate =
    canEdit && voting?.baseVoting.release.type === "manualRelease";
  const canClose =
    voting?.baseVoting.status === "active" &&
    voting?.baseVoting.close.type === "manualClose";
  const isReadOnly = !canEdit;

  const onActivate = () => {
    if (!canActivate) return;
    Alert.alert(
      "Activar votación",
      "¿Estás seguro de que quieres activar esta votación? Una vez activa, no podrás modificar el contenido.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Activar",
          onPress: () =>
            handleActivate({
              id: voting?.baseVotingId!,
              userId: currentUser.id,
            }),
        },
      ]
    );
  };

  const onClose = () => {
    if (!canClose) return;
    Alert.alert(
      "Cerrar votación",
      "¿Estás seguro de que quieres cerrar esta votación? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar",
          style: "destructive",
          onPress: () =>
            handleClose({ id: voting?.baseVotingId!, userId: currentUser.id }),
        },
      ]
    );
  };

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
      <SpinnerApp visible={isLoading}>
        <View>
          <ThemedText type="title">
            {isReadOnly ? "Ver votación" : "Editar votación"}
          </ThemedText>
          <ThemedText type="subtitle">
            Estado: {voting?.baseVoting.status}
          </ThemedText>
        </View>

        <BaseVotingForm
          onSubmit={handleUpdate}
          voting={voting?.baseVoting || null}
          isReadOnly={isReadOnly || isUpdating}
        />

        <View style={{ gap: 12 }}>
          <ButtonApp
            label="Ver votación"
            onPress={() => router.replace(`/voting/${id}`)}
          />
          <ButtonApp
            label="Replicar votación"
            onPress={() => router.push(`/voting/${id}/copy`)}
          />
          {canActivate && (
            <ButtonApp
              label="Activar votación"
              onPress={onActivate}
              disabled={isActivating}
              type="secondary"
            />
          )}

          {canClose && (
            <ButtonApp
              label="Cerrar votación"
              onPress={onClose}
              disabled={isClosing}
              type="cancel"
            />
          )}
          <ButtonApp
            label="← Volver a Nueva Votación"
            onPress={() => router.push("/(tabs)/newVoting")}
            type="secondary"
          />
        </View>
      </SpinnerApp>
    </ThemedView>
  );
}
