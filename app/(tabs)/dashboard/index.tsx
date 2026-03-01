import TopTabNavigatorApp from "@/components/TopTabNavigatorApp";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import MyRooms from "./myRooms";
import MyVotings from "./myVotings";
import { ENTITY_TYPE_DATA } from "@/modules/entities/contants";
import MyAwards from "./myAwards";

export default function DashboardHomeView() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<string>("myVotings");

  useEffect(() => {
    if (!tab) return;

    const getValidTab = (tab: string) => {
      switch (tab) {
        case "myVotings":
          return "myVotings";
        case "myRooms":
          return "myRooms";
        case "myAwards":
          return "myAwards";
        default:
          throw new Error("Tab no válido");
      }
    };

    setActiveTab(getValidTab(tab));
  }, [tab]);

  return (
    <TopTabNavigatorApp
      activeTab={activeTab}
      tabs={[
        {
          name: "myVotings",
          icon: ENTITY_TYPE_DATA.voting.icon,
          component: MyVotings,
          label: "Mis Votaciones",
        },
        {
          name: "myRooms",
          component: MyRooms,
          icon: ENTITY_TYPE_DATA.room.icon,
          label: "Mis Salas",
        },
        {
          name: "myAwards",
          component: MyAwards,
          icon: ENTITY_TYPE_DATA.award.icon,
          label: "Mis Premiaciones",
        },
      ]}
    />
  );
}
