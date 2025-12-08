import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PublicRoomCard from "@/modules/rooms/exploreRooms/public/components/PublicRoomCard";
import { StyleSheet } from "react-native";

export default function PublicRoomsTab() {
  return (
    <ThemedView style={styles.tabContainer}>
      <ThemedText>Salas públicas</ThemedText>
      <PublicRoomCard
        roomName="Sala de Ejemplo"
        roomDescription="Esta es una sala de ejemplo para demostrar el componente PublicRoomCard."
        participantCount={42}
        lastActivity="dsa"
        tags={["ejemplo", "sala", "publica"]}
        ownerName="Juan Pérez"
        onJoin={() => {}}
      />
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
