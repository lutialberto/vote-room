import { useState } from "react";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import UserSwitcherModal from "@/modules/users/profile/components/UserSwitcherModal";
import UserDataSection from "@/modules/users/profile/components/UserDataSection";
import SectionsApp, { SectionProps } from "@/components/SectionsApp";
import { router } from "expo-router";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function ProfileScreen() {
  const [switcherVisible, setSwitcherVisible] = useState(false);
  const { logout } = useAuthenticatedUser();
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const data: SectionProps[] = [
    {
      id: "account",
      title: "Cuenta",
      items: [
        {
          id: "logout",
          name: "Cerrar Sesión",
          icon: "log-out",
          onPress: () => {
            logout();
          },
        },
      ],
    },
    {
      id: "development",
      title: "Desarrollo",
      items: [
        {
          id: "change-user",
          name: "Cambiar Usuario",
          icon: "swap-horizontal",
          onPress: () => setSwitcherVisible(true),
        },
        {
          id: "onboarding",
          name: "Introducción a la App",
          icon: "book",
          onPress: () => router.navigate("/(onboardings)/onBoardingWelcome"),
        },
        {
          id: "user-creation",
          name: "Crear Usuario",
          icon: "person-add",
          onPress: () => router.navigate("/(onboardings)/onBoardingUser"),
        },
      ],
    },
  ];
  return (
    <ThemedView style={styles.container}>
      <ThemedText
        type="title"
        style={{
          textAlign: "center",
        }}
      >
        Mi Perfil
      </ThemedText>

      <UserDataSection />

      <SectionsApp data={data} />
      <UserSwitcherModal
        visible={switcherVisible}
        onClose={() => setSwitcherVisible(false)}
      />
    </ThemedView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      gap: 20,
    },
  });
