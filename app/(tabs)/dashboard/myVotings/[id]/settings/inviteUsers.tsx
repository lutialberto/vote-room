import { useLocalSearchParams } from "expo-router";
import InviteUsersView from "@/modules/explore/invitations/components/inviteUser/InviteUsersView";

export default function InviteUsersToVoting() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <InviteUsersView entityId={id} entityType="voting" />;
}
