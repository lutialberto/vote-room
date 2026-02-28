import { useLocalSearchParams } from "expo-router";
import InviteUsersView from "@/modules/explore/invitations/components/inviteUser/InviteUsersView";

export default function InviteUsersToRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  return <InviteUsersView entityId={roomId} entityType="room" />;
}
