import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ByCodeTab from "./byCode";
import InvitationsTab from "./invitations";
import PublicRoomsTab from "./public";
import { useUser } from "@/contexts/UserContext";
import { usePendingRoomInvitationRequest } from "@/modules/rooms/exploreRooms/invitations/hooks/usePendingRoomInvitationRequest";
import { TabBadgeApp } from "@/components/TabBadgeApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";

const Tab = createMaterialTopTabNavigator();

export default function ExploreRooms() {
  const { currentUser } = useUser();
  const { data } = usePendingRoomInvitationRequest(currentUser?.id);
  const invitationsCount = data?.length || 0;

  const primaryColor = useThemeColor({}, "primary");
  const iconColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "border");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: iconColor,
        tabBarIndicatorStyle: {
          backgroundColor: primaryColor,
          height: 3,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          textTransform: "none",
        },
        tabBarStyle: {
          backgroundColor: backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
        },
      }}
    >
      <Tab.Screen
        name="byCode"
        component={ByCodeTab}
        options={{
          tabBarLabel: "Por Código",
          tabBarIcon: ({ color }) => (
            <IconApp name="keypad" size={18} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="public"
        component={PublicRoomsTab}
        options={{
          tabBarLabel: "Públicas",
          tabBarIcon: ({ color }) => (
            <IconApp name="globe" size={18} color={color} />
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
              <IconApp name="mail" size={18} color={color} />
              <TabBadgeApp visible={invitationsCount > 0} />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
