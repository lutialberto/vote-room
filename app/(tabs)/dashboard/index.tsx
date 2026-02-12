import TopTabNavigatorApp from "@/components/TopTabNavigatorApp";
import MyRooms from "./myRooms";
import MyVotings from "./myVotings";

export default function DashboardHomeView() {
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
          name: "myVotings",
          icon: "bar-chart-outline",
          component: MyVotings,
          label: "Mis Votaciones",
        },
      ]}
    />
  );
}
