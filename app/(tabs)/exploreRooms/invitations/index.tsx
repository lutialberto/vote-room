import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function InvitationsTab() {
  return (
    <ThemedView style={styles.tabContainer}>
      <ThemedText>Invitaciones</ThemedText>
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
