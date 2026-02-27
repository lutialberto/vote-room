import { IconApp, IconName } from "@/components/IconApp";
import { ThemedText } from "@/components/ThemedText";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View, StyleSheet } from "react-native";

const INSTRUCTIONS: {
  name: string;
  icon: IconName;
  text: string;
}[] = [
  {
    name: "roomCode",
    icon: "keypad",
    text: "Los códigos suelen tener entre 4-8 caracteres (ej: ABC123).",
  },
  {
    name: "qrCode",
    icon: "qr-code",
    text: "También puedes escanear un código QR desde el botón al lado",
  },
  {
    name: "privateRoom",
    icon: "lock-closed",
    text: "Las salas privadas requieren aprobación del administrador",
  },
  {
    name: "publicRoom",
    icon: "globe",
    text: "A las salas públicas puedes unirte inmediatamente",
  },
];

export default function SearchRoomByCodeInstructions() {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        ¿Cómo funciona?
      </ThemedText>

      <View style={styles.instructionsList}>
        {INSTRUCTIONS.map((instruction) => (
          <View key={instruction.name} style={styles.instructionItem}>
            <IconApp
              name={instruction.icon}
              size={20}
              colorName="primary"
              style={styles.icon}
            />
            <ThemedText style={{ width: "90%" }}>{instruction.text}</ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.tip}>
        <IconApp
          name="bulb"
          size={16}
          colorName="orange"
          style={styles.tipIcon}
        />
        <ThemedText style={styles.tipText}>
          <ThemedText colorName="orange">Tip:</ThemedText> Si tienes el enlace
          de una sala, ábrelo directamente desde tu navegador o app de
          mensajería
        </ThemedText>
      </View>
    </View>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      marginTop: 32,
      paddingHorizontal: 4,
    },
    title: {
      marginBottom: 20,
    },
    instructionsList: {
      gap: 16,
      marginBottom: 24,
    },
    instructionItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    icon: {
      marginTop: 2,
    },
    tip: {
      flexDirection: "row",
      alignItems: "flex-start",
      borderRadius: 12,
      padding: 16,
      borderLeftWidth: 4,
      gap: 12,
      borderLeftColor: colors.orange,
      backgroundColor: colors.orange + "20",
    },
    tipIcon: {
      marginTop: 2,
    },
    tipText: {
      flex: 1,
      lineHeight: 18,
      fontSize: 14,
    },
  });
