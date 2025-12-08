import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Room } from "@/models/Room";
import { User } from "@/models/User";
import { useUser } from "@/contexts/UserContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CardApp } from "./CardApp";

export type RoomStatNames = "owner" | "active" | "unread";
export type RoomStat = {
  criteria: (r: Room, user: User) => boolean | undefined;
  label: string;
};

export const ROOM_STATS: Record<RoomStatNames, RoomStat> = {
  owner: {
    criteria: (r: Room, user: User) => r.ownerUserId === user.id,
    label: "Propias",
  },
  active: {
    criteria: (r: Room) => r.status === "active",
    label: "Activas",
  },
  unread: {
    criteria: (r: Room) => r.hasUnreadVotes,
    label: "Nuevas",
  },
};

export default function RoomStats({
  rooms,
  handleSelectedStatsItemPress,
  selectedStats,
}: {
  rooms: Room[];
  handleSelectedStatsItemPress: (item: RoomStatNames) => void;
  selectedStats: RoomStatNames | undefined;
}) {
  const { currentUser } = useUser();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <CardApp style={styles.statsContainer}>
      {Object.values(ROOM_STATS).map((stat, index) => {
        const statKey = Object.keys(ROOM_STATS)[index] as RoomStatNames;
        return (
          <TouchableOpacity
            key={stat.label}
            onPress={() => handleSelectedStatsItemPress(statKey)}
            style={[
              styles.statItem,
              selectedStats === statKey && {
                backgroundColor: primaryColor + "20",
              },
            ]}
          >
            <ThemedText colorName="primary" style={styles.statNumber}>
              {rooms.filter((r) => stat.criteria(r, currentUser)).length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
          </TouchableOpacity>
        );
      })}
    </CardApp>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    padding: 0,
    marginBottom: 24,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    opacity: 0.7,
  },
});
