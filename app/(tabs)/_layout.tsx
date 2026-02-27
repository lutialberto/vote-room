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
      router.replace("/login");
    }
  }, [isAppReady, isAuthenticated]);

  const handleTabPress = (tabName: string, initialRoute: Href) => {
    const isCurrentTab = pathname.startsWith(`/${tabName}`);
    if (isCurrentTab) {
      router.dismiss();
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
            position: "absolute",
            height: 80,
            paddingBottom: 20,
            paddingTop: 8,
          },
          default: {
            height: 65,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color }) => (
            <IconApp size={28} name="search" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress("explore", "/explore");
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
            handleTabPress("new", "/new");
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
            handleTabPress("dashboard", "/dashboard");
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
            handleTabPress("profile", "/profile");
          },
        }}
      />
    </Tabs>
  );
}
