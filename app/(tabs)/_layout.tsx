import { Href, router, Tabs, usePathname } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { IconApp } from "@/components/IconApp";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const handleTabPress = (tabName: string, initialRoute: Href) => {
    const isCurrentTab = pathname.startsWith(`/(tabs)/${tabName}`);
    if (isCurrentTab) {
      router.navigate(initialRoute);
    } else {
      router.navigate(initialRoute);
    }
  };

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
            <IconApp size={28} name="search" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("exploreRooms", "/(tabs)/exploreRooms/byCode");
          },
        }}
      />
      <Tabs.Screen
        name="newRoom"
        options={{
          title: "Nueva Sala",
          tabBarIcon: ({ color }) => (
            <IconApp size={28} name="add-circle" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("newRoom", "/(tabs)/newRoom/(steps)/roomNameStep");
          },
        }}
      />
      <Tabs.Screen
        name="newVoting"
        options={{
          title: "Nueva Votación",
          tabBarIcon: ({ color }) => (
            <IconApp size={28} name="bar-chart-outline" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("newVoting", "/(tabs)/newVoting");
          },
        }}
      />
      <Tabs.Screen
        name="myRooms"
        options={{
          title: "Mis Salas",
          tabBarIcon: ({ color }) => (
            <IconApp size={28} name="people" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("myRooms", "/(tabs)/myRooms");
          },
        }}
      />
      <Tabs.Screen
        name="myVotings"
        options={{
          title: "Mis Votaciones",
          tabBarIcon: ({ color }) => (
            <IconApp size={28} name="bar-chart-outline" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("myVotings", "/(tabs)/myVotings");
          },
        }}
      />
    </Tabs>
  );
}
