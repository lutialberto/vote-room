import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { OptionsVote } from "../models/OptionsVote";
import { OptionsVotingChoiceReference } from "../models/OptionsVoting";
import { View } from "react-native";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function OptionsVotingResults({
  votes,
  error,
  options,
}: {
  votes: OptionsVote[];
  options: OptionsVotingChoiceReference[] | undefined;
  error: Error | null;
}) {
  const { currentUser } = useAuthenticatedUser();
  const colors = useThemeColor();
  if (error) {
    return <ThemedText>Error cargando resultados.</ThemedText>;
  }
  const optionsVotes = options?.map((option) => {
    const voteCount = votes.filter(
      (vote) => vote.votingOptionChoiceId === option.id
    ).length;
    return {
      id: option.id,
      text: option.label,
      voteCount,
      selectedByCurrentUser: votes.some(
        (vote) =>
          vote.votingOptionChoiceId === option.id &&
          vote.userId === currentUser.id
      ),
    };
  });
  return (
    <View style={{ gap: 8, width: "100%", alignItems: "center" }}>
      <ThemedText>Votos: {votes.length}</ThemedText>
      {optionsVotes?.map((optionVote) => (
        <View
          key={optionVote.id}
          style={{
            backgroundColor:
              (optionVote.selectedByCurrentUser
                ? colors.primary
                : colors.gray) + "20",
            borderRadius: 4,
          }}
        >
          <View
            style={{
              borderRadius: 4,
              position: "absolute",
              width: "100%",
              height: "100%",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                borderRadius: 4,
                flex: optionVote.voteCount / (votes.length || 1),
                height: "100%",
                backgroundColor: optionVote.selectedByCurrentUser
                  ? colors.primary
                  : colors.gray,
              }}
            ></View>
            <View
              style={{
                flex: 1 - optionVote.voteCount / (votes.length || 1),
              }}
            ></View>
          </View>
          <View
            style={{
              padding: 8,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ThemedText style={{ flex: 1 }}>{optionVote.text}</ThemedText>
            <ThemedText>{optionVote.voteCount}</ThemedText>
          </View>
        </View>
      ))}
    </View>
  );
}
