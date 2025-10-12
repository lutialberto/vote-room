import { Tabs } from "expo-router";
import React from "react";
import { Platform, useColorScheme } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="exploreRooms"
        options={{
          title: "Explorar Salas",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="newRoom"
        options={{
          title: "Nueva Sala",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="add-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myRooms"
        options={{
          title: "Mis Salas",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="people" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
