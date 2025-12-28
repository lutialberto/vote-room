import { ThemedText } from "@/components/ThemedText";
import { VotingStatus } from "../models/Voting";

const labels: Record<VotingStatus, string> = {
  closed: "La votación ha finalizado",
  scheduled: "La votación comienza {{date}}",
  active: "La votación ha comenzado",
  draft: "La votación está en borrador",
};

export default function QuickBooleanPollStatus(props: {
  status: VotingStatus;
  releaseDate?: Date;
}) {
  const label = labels[props.status as keyof typeof labels];
  return (
    <ThemedText>
      {props.status === "scheduled"
        ? label.replace("{{date}}", props.releaseDate?.toLocaleString() ?? "")
        : label}
    </ThemedText>
  );
}
