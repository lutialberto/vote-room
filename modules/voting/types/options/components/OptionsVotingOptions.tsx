import { ButtonApp } from "@/components/ButtonApp";
import { OptionsVotingChoiceReference } from "../models/OptionsVoting";
import { View } from "react-native";

export default function OptionsVotingOptions({
  handleOptionSelected,
  options,
}: {
  handleOptionSelected: (optionId: number) => void;
  options: OptionsVotingChoiceReference[] | undefined;
}) {
  return (
    <View style={{ gap: 4 }}>
      {options?.map((option) => (
        <ButtonApp
          label={option.label}
          key={option.id}
          onPress={() => handleOptionSelected(option.id)}
        />
      ))}
    </View>
  );
}
