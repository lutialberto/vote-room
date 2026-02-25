import { CardApp } from "@/components/CardApp";
import { IconApp } from "@/components/IconApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SectionsApp, { SectionProps } from "@/components/SectionsApp";
import { ColorScheme } from "@/constants/Colors";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Room } from "@/models/Room";
import { fetchRoomByCode } from "@/services/room/roomService";
import { useLocalSearchParams, router } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";

export default function RoomItemHome() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const colors = useThemeColor();
  const { currentUser } = useAuthenticatedUser();
  const styles = getStyles(colors);
  const { data, error, isLoading } = useItemFetcherApp<Room | null>(
    () => fetchRoomByCode(roomId),
    [roomId]
  );

  const isOwner = data?.ownerUserId === currentUser.id;

  const sections: SectionProps[] = [
    ...(isOwner
      ? ([
          {
            id: "owner-actions",
            title: "Administrar Sala",
            items: [
              {
                id: "members",
                name: "Ver miembros",
                icon: "people",
                onPress: () => router.push(`./${roomId}/roomMembers`),
              },
              {
                id: "edit",
                name: "Editar sala",
                icon: "create",
                //TODO: pasar roomId por params y mostrar formulario de edición con los datos de la sala
                onPress: () => Alert.alert("Funcionalidad no implementada"),
              },
              {
                id: "assign-voting",
                name: "Asignar Votación",
                icon: "checkbox",
                onPress: () => Alert.alert("Funcionalidad no implementada"),
              },
            ],
          },
        ] as SectionProps[])
      : []),
    {
      id: "general-actions",
      title: "Acciones",
      items: [
        {
          id: "share",
          name: "Compartir sala",
          icon: "share",
          onPress: () => router.push(`./${roomId}/shareRoom`),
        },
        {
          id: "votings",
          name: "Ver Votaciones",
          icon: "bar-chart",
          onPress: () =>
            router.push(`/dashboard?tab=myVotings&roomId=${roomId}`),
        },
      ],
    },
  ];

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Sala no encontrada</ThemedText>
        <ThemedText type="subtitle">
          La sala con el código {roomId} no existe o no tienes acceso a ella.
        </ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView style={styles.container}>
      <SpinnerApp visible={isLoading}>
        <CardApp type="withShadow" style={styles.roomInfoCard}>
          <View style={styles.roomHeader}>
            <View style={styles.roomIcon}>
              <IconApp name="home" size={40} colorName="primary" />
            </View>
            <View style={styles.roomDetails}>
              <ThemedText type="subtitle">{data?.label}</ThemedText>
              <View style={styles.codeContainer}>
                <IconApp name="key" size={16} />
                <ThemedText type="hint" style={styles.roomCode}>
                  {data?.code}
                </ThemedText>
              </View>
              {data?.description && (
                <ThemedText type="hint" style={styles.description}>
                  {data.description}
                </ThemedText>
              )}
            </View>
          </View>
        </CardApp>

        <SectionsApp data={sections} />
      </SpinnerApp>
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 20,
      gap: 20,
    },
    roomInfoCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    roomHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      flex: 1,
    },
    roomIcon: {
      width: 80,
      aspectRatio: 1,
      borderRadius: 40,
      backgroundColor: colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
    },
    roomDetails: {
      flex: 1,
      gap: 5,
    },
    codeContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    roomCode: {
      fontFamily: "monospace",
    },
    description: {
      marginTop: 2,
    },
  });
