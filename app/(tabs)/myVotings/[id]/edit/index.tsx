import { View, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import {
  activateBaseVoting,
  closeBaseVoting,
  fetchBaseVotingById,
  updateBaseVoting,
} from "@/modules/voting/services/voting/votingService";
import { useLocalSearchParams, router } from "expo-router";
import { SpinnerApp } from "@/components/SpinnerApp";
import BaseVotingForm from "@/modules/voting/components/BaseVotingForm";
import {
  BaseVoting,
  BaseVotingForCreation,
} from "@/modules/voting/models/Voting";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function VotingEditPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuthenticatedUser();

  const {
    data: voting,
    error,
    isLoading,
  } = useItemFetcherApp(() => fetchBaseVotingById(Number(id)), [id]);

  const { isWaiting: isUpdating, execPromise: handleUpdate } = useWaitingApp({
    functionToWait: async (data: BaseVotingForCreation) =>
      updateBaseVoting({
        data: data,
        id: voting?.id!,
        userId: currentUser.id,
      }),
    success: () => router.navigate(`/(tabs)/myVotings/${id}`),
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
      success: () => router.replace(`/(tabs)/myVotings/${id}`),
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
      router.replace(`/(tabs)/myVotings/${id}`);
    },
    failure: () =>
      Alert.alert(
        "Error",
        "No se pudo cerrar la votación. Por favor, inténtalo de nuevo."
      ),
  });

  if (voting && voting.owner.id !== currentUser.id) {
    router.back();
  }

  const canEdit = voting?.status === "draft" || voting?.status === "scheduled";
  const canActivate = canEdit && voting?.release.type === "manualRelease";
  const canClose =
    voting?.status === "active" && voting?.close.type === "manualClose";
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
              id: voting?.id!,
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
            handleClose({ id: voting?.id!, userId: currentUser.id }),
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
          <ThemedText type="subtitle">Estado: {voting?.status}</ThemedText>
        </View>

        <BaseVotingForm
          onSubmit={handleUpdate}
          voting={voting || null}
          isReadOnly={isReadOnly || isUpdating}
        />
        {voting?.type === "options" && (
          <ButtonApp
            label={isReadOnly ? "Ver opciones" : "Gestionar opciones"}
            onPress={() => router.push(`/(tabs)/myVotings/${id}/edit/options`)}
          />
        )}

        <View style={{ gap: 8 }}>
          <ButtonApp
            label="Ver votación"
            onPress={() => router.replace(`/(tabs)/myVotings/${id}`)}
          />
          <ButtonApp
            label="Replicar votación"
            onPress={() => router.push(`/(tabs)/newVoting/${id}/copy`)}
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
        </View>
      </SpinnerApp>
    </ThemedView>
  );
}
