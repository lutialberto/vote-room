import { ButtonApp } from "@/components/ButtonApp";
import { ThemedText } from "@/components/ThemedText";
import { Room } from "@/models/Room";
import { StyleSheet, View } from "react-native";
import {
  SearchRoomByCodeState,
  SearchState,
} from "../models/SearchRoomByCodeState";

export default function SearchRoomByCodeResults({
  state,
  onJoinRoom,
  onNewSearch,
}: {
  state: SearchRoomByCodeState;
  onJoinRoom: () => void;
  onNewSearch: () => void;
}) {
  if (state.state === "idle") return null;

  return (
    <View style={styles.card}>
      {state.state === "found" || state.state === "request-key" ? (
        <>
          <ThemedText type="title">{state.room.label}</ThemedText>
          <ThemedText type="subtitle" style={{ marginBottom: 12 }}>
            {state.room.description}
          </ThemedText>
          <ThemedText type="subtitle">{state.room.code}</ThemedText>
          {state.state === "found" && (
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              <ButtonApp
                label="Unirse"
                style={{ marginHorizontal: 0 }}
                onPress={onJoinRoom}
              />
              <ButtonApp
                label="Seguir buscando"
                type="secondary"
                onPress={onNewSearch}
                style={{ marginHorizontal: 0 }}
              />
            </View>
          )}
        </>
      ) : state.state === "searching" ? (
        <ThemedText type="subtitle">Buscando sala...</ThemedText>
      ) : (
        <ThemedText type="subtitle">
          No se encontró ninguna sala con ese código.
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginVertical: 16,
  },
});
