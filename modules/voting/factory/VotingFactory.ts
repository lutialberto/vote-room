import BaseVotingForm from "../components/BaseVotingForm";
import { VotingType } from "../models/VotingType";

const VotingFormComponents = {
  boolean: BaseVotingForm,
} as const;

// const VotingViewComponents = {
//   boolean: BooleanVotingView,
//   multipleChoice: MultipleChoiceVotingView,
//   ranking: RankingVotingView,
//   scale: ScaleVotingView,
// } as const;

export function getVotingFormComponent(type: VotingType) {
  return VotingFormComponents[type];
}
