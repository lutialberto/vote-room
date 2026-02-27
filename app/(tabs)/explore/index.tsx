import { usePendingRoomInvitationRequest } from "@/modules/explore/invitations/invitations/hooks/usePendingRoomInvitationRequest";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { ThemedView } from "@/components/ThemedView";
import SectionsApp, { SectionProps } from "@/components/SectionsApp";
import { router } from "expo-router";

export default function Explore() {
  const { currentUser } = useAuthenticatedUser();
  const { data } = usePendingRoomInvitationRequest(currentUser?.id);
  const invitationsCount = data?.length || 0;

  const sections: SectionProps[] = [
    {
      id: "rooms",
      title: "Explorar Salas",
      items: [
        {
          id: "publicRooms",
          icon: "people",
          onPress: () => router.push("/explore/rooms/public"),
          name: "Descubrir Salas Públicas",
        },
        {
          id: "searchRoomsByCode",
          icon: "keypad",
          onPress: () => router.push("/explore/rooms/byCode"),
          name: "Buscar Salas por Código",
        },
        {
          id: "roomInvitations",
          icon: "mail",
          onPress: () => router.push("/explore/rooms/invitations"),
          name: "Invitaciones pendientes",
          badge: invitationsCount > 0,
        },
      ],
    },
    {
      id: "votings",
      title: "Explorar Votaciones",
      items: [
        {
          id: "publicVotings",
          icon: "people",
          onPress: () => router.push("/explore/votings/public"),
          name: "Descubrir Votaciones Públicas",
        },
        {
          id: "searchVotingsByCode",
          icon: "keypad",
          onPress: () => router.push("/explore/votings/byCode"),
          name: "Buscar Votaciones por Código",
        },
        {
          id: "votingInvitations",
          icon: "mail",
          onPress: () => router.push("/explore/votings/invitations"),
          name: "Invitaciones pendientes",
          badge: invitationsCount > 0,
        },
      ],
    },
  ];

  return (
    <ThemedView style={{ padding: 16 }}>
      <SectionsApp data={sections} />
    </ThemedView>
  );
}
