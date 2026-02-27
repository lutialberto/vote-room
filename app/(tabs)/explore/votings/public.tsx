import { ButtonApp } from "@/components/ButtonApp";
import SearchBarApp from "@/components/SearchBarApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import FilterChips, { FilterItem } from "@/components/FilterChips";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import PublicVotingCard from "@/modules/explore/public/public/components/PublicVotingCard";
import {
  PublicVotingType,
  PublicVotingTypeFilter,
} from "@/modules/voting/models/Voting";
import { fetchPublicVotings } from "@/modules/voting/services/voting/votingService";
import { addVotingMember } from "@/modules/voting/services/votingMember/votingMemberService";
import PublicVotingFilterModal from "@/modules/explore/public/public/components/PublicVotingFilterModal";

const filterLabels: Record<keyof PublicVotingTypeFilter, string> = {
  question: "Pregunta",
  ownerName: "Creador",
  roomCode: "Cod. de Sala",
};

export default function ExplorePublicVotings() {
  const [appliedFilters, setAppliedFilters] = useState<
    FilterItem<PublicVotingTypeFilter>[]
  >([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { currentUser } = useAuthenticatedUser();
  const { data, error, isLoading, refetch } =
    useListFetcherApp<PublicVotingType>(() => {
      const formattedFilter: PublicVotingTypeFilter = appliedFilters.reduce(
        (acc, item) => ({
          ...acc,
          [item.key]: item.value,
        }),
        {} as PublicVotingTypeFilter
      );
      return fetchPublicVotings(currentUser.id, formattedFilter);
    }, [currentUser.id, appliedFilters]);
  const { isWaiting, execPromise: handleJoinVoting } = useWaitingApp<
    {
      votingId: number;
      userId: number;
    },
    {
      votingId: number;
    }
  >({
    functionToWait: ({ votingId, userId }) =>
      addVotingMember({ votingId, userId }),
    success: ({ votingId }) => {
      refetch();
      router.push(`/dashboard/myVotings/${votingId}`);
    },
  });

  return (
    <SpinnerApp visible={isWaiting}>
      <ThemedView style={{ flex: 1, paddingVertical: 4, paddingHorizontal: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginHorizontal: 4,
          }}
        >
          <SearchBarApp
            onSearch={(value) =>
              setAppliedFilters((prev) => [
                ...prev,
                { key: "question", label: filterLabels.question, value },
              ])
            }
          />
          <ButtonApp
            icon="filter"
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              borderRadius: 0,
            }}
            onPress={() => setIsFilterModalVisible(true)}
          />
        </View>
        <FilterChips
          filters={appliedFilters}
          onRemoveFilter={(key) =>
            setAppliedFilters((prev) => prev.filter((f) => f.key !== key))
          }
          onClearAll={() => setAppliedFilters([])}
        />
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={refetch}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <PublicVotingCard
              votingData={item}
              onJoin={() =>
                handleJoinVoting({
                  votingId: item.id,
                  userId: currentUser.id,
                })
              }
            />
          )}
          ListEmptyComponent={() => (
            <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
              {error
                ? "Ocurrió un error al cargar las votaciones públicas."
                : "No hay votaciones públicas disponibles en este momento."}
            </ThemedText>
          )}
        />

        <PublicVotingFilterModal
          visible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          onApply={(filter) => {
            const formattedFilter: FilterItem<PublicVotingTypeFilter>[] = (
              Object.keys(filter) as (keyof PublicVotingTypeFilter)[]
            ).map((key) => ({
              key,
              label: filterLabels[key],
              value: filter[key] as string | string[],
            }));
            setAppliedFilters(formattedFilter);
            setIsFilterModalVisible(false);
          }}
        />
      </ThemedView>
    </SpinnerApp>
  );
}
