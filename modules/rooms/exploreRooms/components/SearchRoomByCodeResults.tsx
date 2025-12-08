import { ButtonApp } from "@/components/ButtonApp";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";
import { SearchRoomByCodeState } from "../models/SearchRoomByCodeState";
import { CardApp } from "@/components/CardApp";

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
    <CardApp type="withShadow" style={styles.card}>
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
    </CardApp>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
  },
});
