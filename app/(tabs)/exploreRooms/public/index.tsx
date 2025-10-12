import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function PublicRoomsTab() {
  return (
    <ThemedView style={styles.tabContainer}>
      <ThemedText>Salas públicas</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
