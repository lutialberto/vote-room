import { ButtonApp } from "@/components/ButtonApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ColorScheme } from "@/constants/Colors";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Room } from "@/models/Room";
import { fetchRoomByCode } from "@/services/room/roomService";
import { useLocalSearchParams, router } from "expo-router";
import { Alert, StyleSheet } from "react-native";

export default function RoomItemHome() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const colors = useThemeColor();
  const { currentUser } = useAuthenticatedUser();
  const styles = getStyles(colors);
  const { data, error, isLoading } = useItemFetcherApp<Room | null>(
    () => fetchRoomByCode(roomId),
    [roomId]
  );

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
        <ThemedText type="title">{data?.label}</ThemedText>
        <ThemedText>{data?.code}</ThemedText>
        <ThemedText type="subtitle">{data?.description}</ThemedText>
        {data?.ownerUserId === currentUser.id && (
          <>
            <ButtonApp
              label="Ver miembros"
              onPress={() => router.push(`./${roomId}/roomMembers`)}
            />
            <ButtonApp
              label="Editar sala"
              onPress={() => Alert.alert("Funcionalidad no implementada")}
            />
            <ButtonApp
              label="Asignar Votación"
              onPress={() => Alert.alert("Funcionalidad no implementada")}
            />
          </>
        )}
        <ButtonApp
          label="Compartir sala"
          onPress={() => router.push(`./${roomId}/shareRoom`)}
        />
        <ButtonApp
          label="Ver Votaciones"
          onPress={() =>
            //TODO: pasar roomId por params y mostrar solo las votaciones de esa sala
            router.push(`/(tabs)/dashboard/myVotings?roomId=${roomId}`)
          }
        />
      </SpinnerApp>
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      flex: 1,
      justifyContent: "center",
      gap: 20,
    },
  });
