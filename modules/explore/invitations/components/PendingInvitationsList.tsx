import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlatList, StyleSheet } from "react-native";
import { PendingInvitationRequestCard } from "./PendingInvitationRequestCard";
import { PendingInvitationRequest } from "../models/PendingInvitationRequest";

export interface PendingInvitationsListProps {
  isWaiting: boolean;
  isLoadingData: boolean;
  error: Error | null;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  onRefetch: () => void;
  data: PendingInvitationRequest[];
}

export default function PendingInvitationsList(
  props: PendingInvitationsListProps
) {
  const {
    isWaiting,
    isLoadingData,
    error,
    onAccept,
    onReject,
    onRefetch,
    data,
  } = props;
  return (
    <ThemedView style={styles.tabContainer}>
      <SpinnerApp visible={isWaiting}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          refreshing={isLoadingData}
          onRefresh={onRefetch}
          data={data}
          style={{ width: "100%" }}
          ListEmptyComponent={() => (
            <ThemedText style={styles.emptyText}>
              {error
                ? "Ocurrió un error intentando cargar las invitaciones"
                : "No tienes invitaciones pendientes.\n¡Cuando te inviten a una sala aparecerán aquí!"}{" "}
            </ThemedText>
          )}
          renderItem={({ item }) => (
            <PendingInvitationRequestCard
              item={item}
              onAccept={() => onAccept(item.id)}
              onReject={() => onReject(item.id)}
            />
          )}
        />
      </SpinnerApp>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 24,
  },
});
