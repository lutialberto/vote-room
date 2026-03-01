import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet, View, RefreshControl, FlatList } from "react-native";
import RoomCardItem from "@/components/RoomCardItem";
import RoomStats, { ROOM_STATS, RoomStatNames } from "@/components/RoomStats";
import { fetchRoomsByUser } from "@/services/roomMember/roomMemberService";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { fetchAwardById } from "@/modules/awards/services/award/awardService";
import { fetchAwardsByUserId } from "@/modules/awards/services/awardMember/awardMemberService";
import AwardCardItem from "@/modules/awards/components/AwardCardItem";

export default function MyAwards() {
  const { currentUser } = useAuthenticatedUser();
  const {
    data: awards,
    error,
    isLoading,
    refetch,
  } = useListFetcherApp(
    () => fetchAwardsByUserId({ userId: currentUser.id }),
    [currentUser.id]
  );
  const { primary: primaryColor } = useThemeColor();

  return (
    <ThemedView style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        data={awards}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AwardCardItem award={item} />}
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
            {error ? (
              <ThemedText>
                Ocurrió un error al cargar tus premiaciones. Intenta de nuevo
                más tarde.
              </ThemedText>
            ) : (
              <>
                <IconApp name="home-outline" size={80} />
                <ThemedText>No tienes premiaciones aún</ThemedText>
                <ThemedText style={styles.emptyDescription}>
                  Crea una nueva premiación o únete a una existente para
                  comenzar
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
