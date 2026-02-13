import { ButtonApp } from "@/components/ButtonApp";
import { CardApp } from "@/components/CardApp";
import { IconApp } from "@/components/IconApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, router } from "expo-router";
import { Alert, Share, View, StyleSheet, TouchableOpacity } from "react-native";

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
    router.push(`/(tabs)/dashboard/myRooms/${roomId}/inviteUsers`);
  };

  const inviteOptions = [
    {
      key: "inviteUsers",
      title: "👥 Invitar usuarios específicos",
      description: "Invita usuarios por nombre, email o código",
      onPress: onInviteUsers,
    },
    {
      key: "shareLink",
      title: "📱 Compartir en redes sociales",
      description: "Envía el enlace para que se una automáticamente",
      onPress: onShareRoom,
    },
    {
      key: "copyCode",
      title: "📋 Solo el código",
      description: "Para enviar en aplicaciones de mensajería",
      onPress: onCopyToClipboard,
    },
  ];
  return (
    <ThemedView style={styles.container}>
      <CardApp style={styles.codeContainer}>
        <IconApp name="key" size={24} style={styles.keyIcon} />
        <ThemedText type="title">{roomId}</ThemedText>
      </CardApp>

      <View style={{ gap: 8 }}>
        {inviteOptions.map((option) => (
          <TouchableOpacity key={option.key} onPress={option.onPress}>
            <CardApp
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderColor: colors.border,
                borderWidth: 1,
              }}
            >
              <View style={styles.section}>
                <ThemedText type="subtitle">{option.title}</ThemedText>
                <ThemedText style={styles.description}>
                  {option.description}
                </ThemedText>
              </View>
              <IconApp name="chevron-forward" size={30} />
            </CardApp>
          </TouchableOpacity>
        ))}
      </View>
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
    codeContainer: {
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
      gap: 6,
      paddingLeft: 10,
    },
    description: {
      opacity: 0.7,
      lineHeight: 20,
    },
  });
