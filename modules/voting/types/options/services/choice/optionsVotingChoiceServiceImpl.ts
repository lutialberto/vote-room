import { successPromiseBehavior } from "@/services/serviceUtilsImpl";
import { OptionsVotingChoice } from "../../models/OptionsVoting";
import { OPTIONS_VOTING_CHOICE_SERVICE_RESPONSE_MOCK } from "./optionsVotingChoiceServiceResponse";

export class OptionsVotingChoiceServiceImpl {
  private choices: OptionsVotingChoice[] = [
    ...OPTIONS_VOTING_CHOICE_SERVICE_RESPONSE_MOCK,
  ];

  createOptionsVotingChoices(
    optionsVotingId: number,
    options: string[]
  ): OptionsVotingChoice[] {
    const newOptionsVoting: OptionsVotingChoice[] = options.map(
      (option, index) => ({
        label: option,
        id: Math.max(...this.choices.map((e) => e.id)) + 1 + index,
        optionsVotingId,
      })
    );
    this.choices.push(...newOptionsVoting);
    return [...newOptionsVoting];
  }

  updateOptionsVotingChoices(
    optionsVotingId: number,
    options: string[]
  ): OptionsVotingChoice[] {
    this.choices = this.choices.filter(
      (choice) => choice.optionsVotingId !== optionsVotingId
    );
    return this.createOptionsVotingChoices(optionsVotingId, options);
  }

  getInstantOptionsVotingChoicesByOptionsVotingId(
    optionsVotingId: number
  ): OptionsVotingChoice[] {
    return [
      ...this.choices.filter(
        (choice) => choice.optionsVotingId === optionsVotingId
      ),
    ];
  }

  fetchOptionsVotingChoicesByOptionsVotingId(
    optionsVotingId: number
  ): Promise<OptionsVotingChoice[]> {
    return successPromiseBehavior(() =>
      this.getInstantOptionsVotingChoicesByOptionsVotingId(optionsVotingId)
    );
  }
}

export const optionsVotingChoiceServiceInstance =
  new OptionsVotingChoiceServiceImpl();
