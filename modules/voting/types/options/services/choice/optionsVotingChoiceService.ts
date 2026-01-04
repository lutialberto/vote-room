import { OptionsVotingChoice } from "../../models/OptionsVoting";
import { optionsVotingChoiceServiceInstance } from "./optionsVotingChoiceServiceImpl";

export function fetchOptionsVotingChoicesByOptionsVotingId(
  optionsVotingId: number
): Promise<OptionsVotingChoice[]> {
  return optionsVotingChoiceServiceInstance.fetchOptionsVotingChoicesByOptionsVotingId(
    optionsVotingId
  );
}
