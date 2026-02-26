import { ThemedText } from "@/components/ThemedText";
import { VotingStatus } from "../models/Voting";

const labels: Record<VotingStatus, string> = {
  closed: "La votación ha finalizado",
  scheduled: "La votación comienza {{date}}",
  active: "La votación ha comenzado",
  draft: "La votación está en borrador",
};

export default function BaseVotingStatus(props: {
  status: VotingStatus;
  releaseDate?: Date;
  isFinished: boolean;
}) {
  const key = props.isFinished ? "closed" : props.status;
  const label = labels[key as keyof typeof labels];
  return (
    <ThemedText>
      {key === "scheduled"
        ? label.replace("{{date}}", props.releaseDate?.toLocaleString() ?? "")
        : label}
    </ThemedText>
  );
}
