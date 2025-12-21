import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function VotingPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Voting Page {id}</Text>
    </View>
  );
}
