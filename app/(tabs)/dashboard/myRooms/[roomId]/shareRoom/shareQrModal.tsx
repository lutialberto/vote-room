import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ColorScheme } from "@/constants/Colors";
import { useItemFetcherApp } from "@/hooks/useItemFetcherApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Room } from "@/models/Room";
import { fetchRoomByCode } from "@/services/room/roomService";
import { getDeepLinkRoomDetailInvitation } from "@/utils/deeplink.utils";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ShareQrModal() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const colors = useThemeColor();
  const styles = getStyles(colors);
  const { data, isLoading } = useItemFetcherApp<Room | null>(
    () => fetchRoomByCode(roomId),
    [roomId]
  );
  const roomKey = data?.scope.isPrivate ? data.key : undefined;
  const deepLink = getDeepLinkRoomDetailInvitation(roomId, roomKey);

  return (
    <ThemedView style={styles.modalContainer}>
      <SpinnerApp visible={isLoading}>
        <ThemedText type="subtitle" style={styles.qrTitle}>
          Sala: {roomId}
        </ThemedText>
        <ThemedText style={styles.qrDescription}>
          Escanea este código QR para unirte automáticamente a la sala de
          votación
        </ThemedText>
        <QRCode value={deepLink} size={200} />
      </SpinnerApp>
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      padding: 20,
      gap: 10,
    },
    qrTitle: {
      textAlign: "center",
    },
    qrDescription: {
      textAlign: "center",
      opacity: 0.7,
      lineHeight: 20,
    },
  });
