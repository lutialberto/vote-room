import InviteUsersView from "@/modules/explore/invitations/components/inviteUser/InviteUsersView";
import { useLocalSearchParams } from "expo-router";

export default function AwardSettingsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <InviteUsersView entityId={id} entityType="award" />;
}
