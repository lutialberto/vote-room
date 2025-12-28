import { useUser } from "@/contexts/UserContext";
import { useLocalSearchParams } from "expo-router";
import BooleanVotingView from "@/modules/voting/types/boolean/components/BooleanVotingView";

export default function VotingPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useUser();

  return <BooleanVotingView id={Number(id)} user={user} />;
}
