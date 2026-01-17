import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View, RefreshControl, FlatList } from "react-native";
import { useUser } from "@/contexts/UserContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import VotingCardItem from "@/modules/voting/view/components/VotingCardItem";
import { fetchBaseVotingsByUserId } from "@/modules/voting/services/voting/votingService";

export default function MyVotings() {
  const { currentUser } = useUser();
  const { data, error, isLoading, refetch } = useListFetcherApp(
    () => fetchBaseVotingsByUserId(currentUser.id),
    [currentUser.id]
  );
  const { primary: primaryColor } = useThemeColor();

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.header}>
        <ThemedText type="title">🏠 Mis Votaciones</ThemedText>
        <ThemedText type="subtitle" style={styles.pageSubtitle}>
          Votaciones donde eres miembro o propietario
        </ThemedText>
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
    textAlign: "center",
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
