import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View, RefreshControl, FlatList } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import VotingCardItem from "@/modules/voting/view/components/VotingCardItem";
import { fetchBaseVotingsByFilter } from "@/modules/voting/services/voting/votingService";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useLocalSearchParams } from "expo-router";

export default function MyVotings() {
  const { currentUser } = useAuthenticatedUser();
  const { roomId } = useLocalSearchParams<{ roomId?: string }>();
  const { data, error, isLoading, refetch } = useListFetcherApp(
    () => fetchBaseVotingsByFilter(currentUser.id, roomId),
    [currentUser.id, roomId]
  );
  const { primary: primaryColor } = useThemeColor();

  return (
    <ThemedView style={{ flex: 1, paddingTop: 20 }}>
      <View style={styles.header}>
        {/* TODO: implementar filtrado por sala */}
        {roomId && (
          <View style={styles.filterIndicator}>
            <IconApp name="filter" size={14} colorName="primary" />
            <ThemedText type="hint" style={styles.filterText}>
              Filtrando por sala: {roomId}
            </ThemedText>
          </View>
        )}
      </View>

      <FlatList
        data={data}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VotingCardItem {...item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={primaryColor}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {error && (
              <ThemedText style={styles.emptyDescription}>
                Ocurrió un error al cargar tus votaciones
              </ThemedText>
            )}
            {!isLoading && !error && (
              <>
                <IconApp name="home-outline" size={80} />
                <ThemedText>No tienes votaciones aún</ThemedText>
                <ThemedText style={styles.emptyDescription}>
                  Crea una nueva votación o únete a una existente
                </ThemedText>
              </>
            )}
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  pageSubtitle: {
    opacity: 0.7,
  },
  filterIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(0, 123, 255, 0.1)",
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  filterText: {
    fontSize: 12,
    fontStyle: "italic",
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyDescription: {
    opacity: 0.7,
    textAlign: "center",
  },
});
