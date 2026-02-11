import { Href, router, Tabs, usePathname } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { IconApp } from "@/components/IconApp";
import { useAppReady } from "@/hooks/useAppReady";
import { useEffect } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const { isAppReady, isAuthenticated } = useAppReady();

  useEffect(() => {
    if (isAppReady && !isAuthenticated) {
      router.replace("/(unsigned)/login");
    }
  }, [isAppReady, isAuthenticated]);

  const handleTabPress = (tabName: string, initialRoute: Href) => {
    const isCurrentTab = pathname.startsWith(`/(tabs)/${tabName}`);
    if (isCurrentTab) {
      router.navigate(initialRoute);
    } else {
      router.navigate(initialRoute);
    }
  };

  if (!isAppReady || !isAuthenticated) {
    return null;
  }

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
          title: "Explorar",
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
        name="new"
        options={{
          title: "Crear",
          tabBarIcon: ({ color }) => (
            <IconApp size={28} name="add-circle" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("new", "/(tabs)/new");
          },
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Mis Cosas",
          tabBarIcon: ({ color }) => (
            <IconApp size={28} name="grid" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("dashboard", "/(tabs)/dashboard/myRooms");
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconApp size={28} name="person-circle" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("profile", "/(tabs)/profile");
          },
        }}
      />
    </Tabs>
  );
}
