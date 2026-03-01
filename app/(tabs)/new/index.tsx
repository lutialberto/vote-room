import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CardApp } from "@/components/CardApp";
import { IconApp, IconName } from "@/components/IconApp";
import { TouchableOpacity, ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { ENTITY_TYPE_DATA } from "@/modules/entities/contants";

const options: {
  title: string;
  description: string;
  iconName: IconName;
  onPress: () => void;
}[] = [
  {
    title: "Crear Votación",
    description: "Crea una nueva votación para que otros puedan participar",
    iconName: ENTITY_TYPE_DATA.voting.icon,
    onPress: () => router.push("/new/newVoting"),
  },
  {
    title: "Crear Sala",
    description: "Organiza un espacio para múltiples votaciones",
    iconName: ENTITY_TYPE_DATA.room.icon,
    onPress: () => router.push("/new/newRoom/roomNameStep"),
  },
  {
    title: "Crear Premiación",
    description: "Crea una premiación y elige a los jueces que votarán",
    iconName: ENTITY_TYPE_DATA.award.icon,
    onPress: () => router.push("/new/newAward"),
  },
];
export default function NewBaseScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.subtitle}>
        Selecciona una opción para comenzar
      </ThemedText>

      <ThemedView style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity key={option.title} onPress={option.onPress}>
            <CardApp type="withShadow" style={styles.cardContent}>
              <IconApp name={option.iconName} size={48} />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ThemedText type="subtitle">{option.title}</ThemedText>
                <ThemedText type="default" style={styles.cardDescription}>
                  {option.description}
                </ThemedText>
              </View>
            </CardApp>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 14,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
  optionsContainer: {
    gap: 8,
  },
  cardContent: {
    alignItems: "center",
    gap: 12,
  },
  cardDescription: {
    textAlign: "center",
    opacity: 0.8,
  },
});
