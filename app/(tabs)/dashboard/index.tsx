import TopTabNavigatorApp from "@/components/TopTabNavigatorApp";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import MyRooms from "./myRooms";
import MyVotings from "./myVotings";

export default function DashboardHomeView() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<string>("myRooms");

  useEffect(() => {
    if (!tab) return;

    const getValidTab = (tab: string) => {
      switch (tab) {
        case "myVotings":
          return "myVotings";
        case "myRooms":
          return "myRooms";
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
          name: "myRooms",
          component: MyRooms,
          icon: "people",
          label: "Mis Salas",
        },
        {
          name: "myVotings",
          icon: "bar-chart-outline",
          component: MyVotings,
          label: "Mis Votaciones",
        },
      ]}
    />
  );
}
