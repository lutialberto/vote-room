import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";
import { useNewRoomData } from "@/modules/rooms/newSteps/hooks/useNewRoomData";
import { BaseRoom, CreateRoomData } from "@/models/Room";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { createRoom } from "@/services/room/roomService";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { SpinnerApp } from "@/components/SpinnerApp";
import NewScopeStep from "@/modules/new/components/newScopeStep/NewScopeStep";
import { ButtonApp } from "@/components/ButtonApp";
import { useNewScopeStep } from "@/modules/new/components/newScopeStep/useNewScopeStep";

export default function RoomScopeStep() {
  const { currentUser } = useAuthenticatedUser();
  const colors = useThemeColor();
  const { isPrivate, membersType } = useNewScopeStep();
  const { saveRoomScopeData, resetRoomData, roomNameData, roomTypeData } =
    useNewRoomData();
  const styles = getStyles(colors);
  const { execPromise: fnCreateRoom, isWaiting: isCreatingRoom } =
    useWaitingApp<CreateRoomData, BaseRoom>({
      functionToWait: (data: CreateRoomData) => createRoom(data),
      success: (room) => {
        router.replace(`/dashboard/myRooms/${room.code}`);
        resetRoomData();
      },
    });

  const onConfirm = () => {
    saveRoomScopeData({ scope: { isPrivate, membersType } });
    if (isPrivate) {
      const dataToCreate: CreateRoomData = {
        label: roomNameData?.label || "",
        description: roomNameData?.description || "",
        ownerName: currentUser.userName,
        ownerUserId: currentUser.id,
        tags: roomTypeData?.tags || [],
        scope: {
          isPrivate,
          membersType,
        },
      };
      fnCreateRoom(dataToCreate);
    } else {
      const dataToCreate: CreateRoomData = {
        label: roomNameData?.label || "",
        description: roomNameData?.description || "",
        ownerName: currentUser.userName,
        ownerUserId: currentUser.id,
        tags: roomTypeData?.tags || [],
        scope: {
          isPrivate,
          membersType,
        },
      };
      fnCreateRoom(dataToCreate);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SpinnerApp visible={isCreatingRoom}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            🔧 Configuración Final
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Define la privacidad y acceso a tu sala de votación
          </ThemedText>
        </View>

        <NewScopeStep stepNumber={3} />

        <ButtonApp label="Crear Sala" onPress={() => onConfirm()} />
      </SpinnerApp>
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 12,
    },
    header: {
      alignItems: "center",
      marginBottom: 12,
      gap: 12,
    },
    title: {
      textAlign: "center",
    },
    subtitle: {
      textAlign: "center",
      opacity: 0.7,
    },
  });
