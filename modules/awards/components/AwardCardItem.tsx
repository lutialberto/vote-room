import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RoomStatus } from "@/models/Room";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { Award } from "../models/award";
import { CardApp } from "@/components/CardApp";
import { ThemedText } from "@/components/ThemedText";
import { IconApp } from "@/components/IconApp";

export default function AwardCardItem({ award }: { award: Award }) {
  const {
    green: greenColor,
    orange: orangeColor,
    gray: grayColor,
  } = useThemeColor();

  const { currentUser } = useAuthenticatedUser();

  const statusConfig: Record<RoomStatus, { color: string; text: string }> = {
    active: { color: greenColor, text: "Activa" },
    paused: { color: orangeColor, text: "Pausada" },
    finished: { color: grayColor, text: "Finalizada" },
  };
  //   const roomStatusConfig = award.status
  //     ? statusConfig[award.status]
  //     : {
  //         color: grayColor,
  //         text: "Inactiva",
  //       };

  const navigateToAward = (awardId: number) => {
    router.push(`/dashboard/myAwards/${awardId}`);
  };

  return (
    <TouchableOpacity
      key={award.id}
      onPress={() => navigateToAward(award.id)}
      activeOpacity={0.7}
    >
      <CardApp type="withShadow">
        <View style={styles.cardHeader}>
          <ThemedText style={styles.title}>{award.name}</ThemedText>
        </View>

        <ThemedText style={styles.description} numberOfLines={2}>
          {award.description}
        </ThemedText>

        <View style={styles.cardFooter}>
          <View style={[styles.row, { gap: 12 }]}>
            <View style={styles.roleInfo}>
              <IconApp
                name="airplane"
                size={16}
                colorName={
                  award.owner.id === currentUser.id ? "orange" : "icon"
                }
              />
              <ThemedText
                colorName={
                  award.owner.id === currentUser.id ? "orange" : "text"
                }
                style={styles.roleText}
              >
                {award.owner.id === currentUser.id ? "Propietario" : "Miembro"}
              </ThemedText>
            </View>
          </View>

          <IconApp name="chevron-forward" size={20} />
        </View>
      </CardApp>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  memberCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  roleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roleText: {
    fontSize: 12,
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  lastActivity: {
    fontSize: 12,
    opacity: 0.5,
  },
});
