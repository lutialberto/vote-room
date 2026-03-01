import SectionsApp, { SectionProps } from "@/components/SectionsApp";
import { router, useLocalSearchParams } from "expo-router";

export default function AwardSettingsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data: SectionProps[] = [
    {
      id: "actions",
      title: "Acciones",
      items: [
        {
          id: "invite",
          icon: "person-add",
          name: "Invitar participantes",
          onPress: () =>
            router.push(`/dashboard/myAwards/${id}/settings/invitations`),
        },
      ],
    },
  ];
  return <SectionsApp data={data} />;
}
