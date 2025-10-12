import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ByCodeTab from "./byCode";
import InvitationsTab from "./invitations";
import PublicRoomsTab from "./public";

const Tab = createMaterialTopTabNavigator();

export default function ExploreRooms() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <Ionicons name="mail" size={18} color={color} />
            ),
            // TODO: Agregar badge cuando haya invitaciones pendientes
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
