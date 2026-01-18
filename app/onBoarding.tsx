import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { useOnboarding } from "@/hooks/useOnboarding";
import { StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

export default function OnBoardingView() {
  const { completeOnboarding } = useOnboarding();
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    router.replace("/(tabs)/exploreRooms/byCode");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          ¡Bienvenido a Vote Room!
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Crea salas, organiza votaciones y toma decisiones en grupo de manera
          fácil y democrática.
        </ThemedText>

        <View style={styles.features}>
          <ThemedText style={styles.feature}>
            ✅ Crea salas públicas o privadas
          </ThemedText>
          <ThemedText style={styles.feature}>
            🗳️ Organiza votaciones de opciones múltiples
          </ThemedText>
          <ThemedText style={styles.feature}>
            👥 Invita usuarios a participar
          </ThemedText>
          <ThemedText style={styles.feature}>
            📊 Ve los resultados en tiempo real
          </ThemedText>
        </View>
      </View>

      <View style={styles.footer}>
        <ButtonApp
          label="Comenzar"
          onPress={handleCompleteOnboarding}
          style={styles.startButton}
        />
      </View>
    </ThemedView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      gap: 30,
    },
    title: {
      textAlign: "center",
      marginBottom: 10,
    },
    subtitle: {
      textAlign: "center",
      fontSize: 18,
      lineHeight: 24,
      opacity: 0.8,
    },
    features: {
      gap: 15,
      marginTop: 20,
    },
    feature: {
      fontSize: 16,
      lineHeight: 24,
    },
    footer: {
      paddingTop: 20,
    },
    startButton: {
      marginTop: 20,
    },
  });
