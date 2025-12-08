import { ButtonApp } from "@/components/ButtonApp";
import { CardApp } from "@/components/CardApp";
import HorizontalDivider from "@/components/divider/HorizontalDivider";
import { IconApp } from "@/components/IconApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, router } from "expo-router";
import { Alert, Share, View, StyleSheet } from "react-native";

export default function ShareRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const onCopyToClipboard = async () => {
    await Clipboard.setStringAsync(roomId);
  };

  const onShareRoom = async () => {
    const webUrl = `https://vote-room.app/room/${roomId}`;
    const deepLink = `vote-room://room/${roomId}`;

    const message = `¡Únete a mi sala de votación!\n\nCódigo: ${roomId}\n\n${webUrl}`;

    try {
      await Share.share({
        message: message,
        url: webUrl,
        title: "Únete a mi sala de votación",
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo compartir");
    }
  };

  const onInviteUsers = () => {
    router.push(`/${roomId}/inviteUsers`);
  };

  return (
    <ThemedView style={styles.container}>
      <CardApp style={styles.codeContainer}>
        <IconApp name="key" size={24} style={styles.keyIcon} />
        <ThemedText type="title">{roomId}</ThemedText>
      </CardApp>

      <View style={styles.section}>
        <ThemedText type="subtitle">👥 Invitar usuarios específicos</ThemedText>
        <ThemedText style={styles.description}>
          Invita usuarios por nombre, email o código
        </ThemedText>
        <ButtonApp label="👥 Invitar usuarios" onPress={onInviteUsers} />
      </View>

      <HorizontalDivider />

      <View style={styles.section}>
        <ThemedText type="subtitle">📱 Compartir en redes sociales</ThemedText>
        <ThemedText style={styles.description}>
          Envía el enlace para que se una automáticamente
        </ThemedText>
        <ButtonApp label="🔗 Compartir enlace" onPress={onShareRoom} />
      </View>

      <HorizontalDivider />

      <View style={styles.section}>
        <ThemedText type="subtitle">📋 Solo el código</ThemedText>
        <ThemedText style={styles.description}>
          Para enviar en aplicaciones de mensajería
        </ThemedText>
        <ButtonApp
          label="📋 Copiar código"
          onPress={onCopyToClipboard}
          type="secondary"
        />
      </View>
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      flex: 1,
      justifyContent: "center",
    },
    codeContainer: {
      marginBottom: 32,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.border,
    },
    keyIcon: {
      marginRight: 12,
    },
    roomCode: {
      fontSize: 28,
      fontWeight: "bold",
      letterSpacing: 2,
    },
    section: {
      marginBottom: 24,
      gap: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    description: {
      opacity: 0.7,
      lineHeight: 20,
    },
  });
