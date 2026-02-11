import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp, IconName } from "@/components/IconApp";
import { TabBadgeApp } from "./TabBadgeApp";

const Tab = createMaterialTopTabNavigator();

export interface TopTabNavigatorAppProps {
  tabs: {
    name: string;
    component: React.ComponentType<any>;
    label: string;
    icon: IconName;
    badge?: boolean;
  }[];
}

export default function TopTabNavigatorApp(props: TopTabNavigatorAppProps) {
  const {
    primary: primaryColor,
    icon: iconColor,
    border: borderColor,
    background: backgroundColor,
  } = useThemeColor();

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
      {props.tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ color }) => (
              <>
                <IconApp name={tab.icon} size={18} color={color} />
                <TabBadgeApp visible={tab.badge ?? false} />
              </>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
