import ByCodeTab from "./byCode";
import InvitationsTab from "./invitations";
import PublicRoomsTab from "./public";
import { usePendingRoomInvitationRequest } from "@/modules/rooms/exploreRooms/invitations/hooks/usePendingRoomInvitationRequest";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import TopTabNavigatorApp from "@/components/TopTabNavigatorApp";

export default function ExploreRooms() {
  const { currentUser } = useAuthenticatedUser();
  const { data } = usePendingRoomInvitationRequest(currentUser?.id);
  const invitationsCount = data?.length || 0;

  return (
    <TopTabNavigatorApp
      tabs={[
        {
          name: "byCode",
          component: ByCodeTab,
          label: "Por Código",
          icon: "keypad",
        },
        {
          name: "public",
          component: PublicRoomsTab,
          label: "Públicas",
          icon: "globe",
        },
        {
          name: "invitations",
          component: InvitationsTab,
          label: "Invitaciones",
          icon: "mail",
          badge: invitationsCount > 0,
        },
      ]}
    />
  );
}
