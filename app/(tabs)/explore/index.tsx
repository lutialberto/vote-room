import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { ThemedView } from "@/components/ThemedView";
import SectionsApp, { SectionProps } from "@/components/SectionsApp";
import { router } from "expo-router";
import { usePendingInvitationRequest } from "@/modules/explore/invitations/hooks/usePendingInvitationRequest";

export default function Explore() {
  const { currentUser } = useAuthenticatedUser();
  const { data } = usePendingInvitationRequest(currentUser?.id);
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
      ],
    },
    {
      id: "invitations",
      title: "Invitaciones",
      items: [
        {
          id: "invitations",
          icon: "mail",
          onPress: () => router.push("/explore/invitations"),
          name: "Invitaciones pendientes",
          badge: invitationsCount > 0,
        },
      ],
    },
  ];

  return (
    <ThemedView style={{ padding: 16, flex: 1 }}>
      <SectionsApp data={sections} />
    </ThemedView>
  );
}
