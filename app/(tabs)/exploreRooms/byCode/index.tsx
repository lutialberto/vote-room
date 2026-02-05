import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import SearchRoomByCodeForm from "@/modules/rooms/exploreRooms/components/SearchRoomByCodeForm";
import SearchRoomByCodeFormKey from "@/modules/rooms/exploreRooms/components/SearchRoomByCodeFormKey";
import SearchInstructions from "@/modules/rooms/exploreRooms/components/SearchRoomByCodeInstructions";
import SearchRoomByCodeResults from "@/modules/rooms/exploreRooms/components/SearchRoomByCodeResults";
import { SearchRoomByCodeState } from "@/modules/rooms/exploreRooms/models/SearchRoomByCodeState";
import { getRoomByCode } from "@/services/room/roomService";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { joinRoom } from "@/services/roomMember/roomMemberService";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function ByCodeTab() {
  const { currentUser } = useAuthenticatedUser();
  const [state, setState] = useState<SearchRoomByCodeState>({
    state: "idle",
  });

  const handleSearch = async (roomCode: string) => {
    setState((prev) => ({
      ...prev,
      state: "searching",
    }));
    getRoomByCode(roomCode.toUpperCase())
      .then((room) => {
        console.log({ room, roomCode });
        if (room) {
          setState({ state: "found", room });
        } else {
          setState({ state: "not-found" });
        }
      })
      .catch((error) => {
        setState({ state: "not-found" });
      });
  };

  const handleJoinRoom = () => {
    if (state.state !== "found") return;
    if (state.room.isPrivate) {
      setState({ ...state, state: "request-key" });
    } else {
      joinRoom(state.room.code, currentUser.id)
        .then(() => {
          handleNewSearch();
          router.push(`/(tabs)/myRooms/${state.room.code}/shareRoom`);
        })
        .catch(() => {
          setState({ state: "error" });
        });
    }
  };

  const handleNewSearch = () => {
    setState({ state: "idle" });
  };

  const handleSubmitKey = (key: string) => {
    if (state.state !== "request-key" || state.room.isPrivate === false) return;
    if (state.room.key === key) {
      joinRoom(state.room.code, currentUser.id, key)
        .then(() => {
          handleNewSearch();
          router.push(`/(tabs)/myRooms/${state.room.code}/shareRoom`);
        })
        .catch((error) => {
          setState((prev) => ({
            ...prev,
            keyErrorMessage: "Error al unirse a la sala.",
          }));
        });
    } else {
      setState((prev) => ({
        ...prev,
        keyErrorMessage: "Clave incorrecta. Inténtalo de nuevo.",
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ThemedView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <SearchRoomByCodeResults
            state={state}
            onJoinRoom={handleJoinRoom}
            onNewSearch={handleNewSearch}
          />

          {state.state === "idle" && <SearchInstructions />}
          {!["found", "request-key"].includes(state.state) && (
            <SearchRoomByCodeForm
              isSearching={state.state === "searching"}
              onSearch={handleSearch}
            />
          )}
          {state.state === "request-key" && (
            <SearchRoomByCodeFormKey
              onSubmit={handleSubmitKey}
              errorMessage={state.keyErrorMessage}
            />
          )}
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
});
