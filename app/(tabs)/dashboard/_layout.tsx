import TopTabNavigatorApp from "@/components/TopTabNavigatorApp";
import MyRooms from "./myRooms";
import MyVotings from "./myVotings";

export default function DashboardLayout() {
  return (
    <TopTabNavigatorApp
      tabs={[
        {
          name: "myRooms",
          component: MyRooms,
          icon: "people",
          label: "Mis Salas",
        },
        {
          name: "myVoting",
          icon: "bar-chart-outline",
          component: MyVotings,
          label: "Mis Votaciones",
        },
      ]}
    />
  );
}
