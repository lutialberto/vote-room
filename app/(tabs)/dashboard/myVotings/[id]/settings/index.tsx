import { Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import {
  activateBaseVoting,
  closeBaseVoting,
  fetchBaseVotingById,
} from "@/modules/voting/services/voting/votingService";
import { useLocalSearchParams, router } from "expo-router";
import { SpinnerApp } from "@/components/SpinnerApp";
import { BaseVoting } from "@/modules/voting/models/Voting";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import SectionsApp, { SectionProps } from "@/components/SectionsApp";

export default function VotingEditPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuthenticatedUser();

  const {
    data: voting,
    error,
    isLoading,
  } = useItemFetcherApp(() => fetchBaseVotingById(Number(id)), [id]);

  const { isWaiting: isActivating, execPromise: handleActivate } =
    useWaitingApp<
      {
        id: number;
        userId: number;
      },
      BaseVoting
    >({
      functionToWait: async (props) => activateBaseVoting(props),
      success: () => router.replace(`/dashboard/myVotings/${id}`),
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
      router.replace(`/dashboard/myVotings/${id}`);
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

  const data: SectionProps[] = [
    {
      id: "view",
      title: "Visualizar",
      items: [
        {
          id: "voting",
          name: "Votación",
          icon: "eye",
          onPress: () => router.replace(`/dashboard/myVotings/${id}`),
        },
        ...(voting?.type === "options" && isReadOnly
          ? ([
              {
                id: "options",
                name: "Opciones",
                icon: "list",
                onPress: () =>
                  router.push(`/dashboard/myVotings/${id}/settings/options`),
              },
            ] as SectionProps["items"])
          : []),
        ...(isReadOnly
          ? ([
              {
                id: "configuration",
                name: "Detalles",
                icon: "settings",
                onPress: () =>
                  router.push(
                    `/dashboard/myVotings/${id}/settings/configuration`
                  ),
              },
            ] as SectionProps["items"])
          : []),
      ],
    },
    {
      id: "actions",
      title: "Acciones",
      items: [
        ...(!isReadOnly
          ? ([
              {
                id: "configuration",
                name: "Detalles",
                icon: "settings",
                onPress: () =>
                  router.push(
                    `/dashboard/myVotings/${id}/settings/configuration`
                  ),
              },
            ] as SectionProps["items"])
          : []),
        ...(voting?.type === "options" && !isReadOnly
          ? ([
              {
                id: "options",
                name: "Opciones",
                icon: "list",
                onPress: () =>
                  router.push(`/dashboard/myVotings/${id}/settings/options`),
              },
            ] as SectionProps["items"])
          : []),
        ...(canActivate
          ? ([
              {
                id: "activate",
                name: "Activar votación",
                icon: "play",
                onPress: onActivate,
              },
            ] as SectionProps["items"])
          : []),
        ...(canClose
          ? ([
              {
                id: "close",
                name: "Terminar votación",
                icon: "stop",
                onPress: onClose,
              },
            ] as SectionProps["items"])
          : []),
        {
          id: "copy",
          name: "Replicar votación",
          icon: "copy",
          onPress: () => router.push(`/new/newVoting/${id}/copy`),
        },
      ],
    },
  ];

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
      <SpinnerApp visible={isLoading || isActivating || isClosing}>
        <SectionsApp data={data} />
      </SpinnerApp>
    </ThemedView>
  );
}
