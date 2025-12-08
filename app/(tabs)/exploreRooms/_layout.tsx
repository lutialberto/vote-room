import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import ByCodeTab from "./byCode";
import InvitationsTab from "./invitations";
import PublicRoomsTab from "./public";
import { useUser } from "@/contexts/UserContext";
import { usePendingRoomInvitationRequest } from "@/modules/rooms/exploreRooms/invitations/hooks/usePendingRoomInvitationRequest";
import { View } from "react-native";
import { TabBadgeApp } from "@/components/TabBadgeApp";

const Tab = createMaterialTopTabNavigator();

export default function ExploreRooms() {
  const { currentUser } = useUser();
  const { data } = usePendingRoomInvitationRequest(currentUser?.id);
  const invitationsCount = data?.length || 0;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#0186FF",
        tabBarInactiveTintColor: "#666",
        tabBarIndicatorStyle: {
          backgroundColor: "#0186FF",
          height: 3,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          textTransform: "none",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
        },
      }}
    >
      <Tab.Screen
        name="byCode"
        component={ByCodeTab}
        options={{
          tabBarLabel: "Por Código",
          tabBarIcon: ({ color }) => (
            <Ionicons name="keypad" size={18} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="public"
        component={PublicRoomsTab}
        options={{
          tabBarLabel: "Públicas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="globe" size={18} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="invitations"
        component={InvitationsTab}
        options={{
          tabBarLabel: "Invitaciones",
          tabBarIcon: ({ color }) => (
            <>
              <Ionicons name="mail" size={18} color={color} />
              <TabBadgeApp visible={invitationsCount > 0} />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
