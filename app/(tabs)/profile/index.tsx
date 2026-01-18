import { useState } from "react";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import UserSwitcherModal from "@/modules/users/profile/components/UserSwitcherModal";
import UserDataSection from "@/modules/users/profile/components/UserDataSection";
import SectionsApp, { SectionProps } from "@/components/SectionsApp";

export default function ProfileScreen() {
  const [switcherVisible, setSwitcherVisible] = useState(false);
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const data: SectionProps[] = [
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
