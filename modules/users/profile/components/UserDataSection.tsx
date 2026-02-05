import { View, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { IconApp } from "@/components/IconApp";
import { CardApp } from "@/components/CardApp";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function UserDataSection() {
  const { currentUser } = useAuthenticatedUser();
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <CardApp type="withShadow" style={styles.avatarSection}>
      <View style={styles.avatar}>
        <IconApp name="person" size={40} colorName="primary" />
      </View>
      <View>
        <ThemedText type="subtitle">{currentUser.userName}</ThemedText>
        {currentUser.type === "email" && (
          <ThemedText type="hint">{currentUser.email}</ThemedText>
        )}
      </View>
    </CardApp>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    avatarSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    avatar: {
      width: 80,
      aspectRatio: 1,
      borderRadius: 40,
      backgroundColor: colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
    },
  });
